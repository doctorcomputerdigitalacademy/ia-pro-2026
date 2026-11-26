"use client";

import { Cancel01Icon, CheckmarkCircle02Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { PRICE_VALUE, REGISTRATION_URL, SHEETS_WEBHOOK_URL, WHATSAPP_NUMBER } from "@/lib/landing/config";
import { RESERVATION as R } from "@/lib/landing/content.fr";
import { Icon } from "./Icon";
import { track } from "./MetaPixel";

const REF_KEY = "iapro-ref";
const ID_KEY = "iapro-form-id";

/* Deux champs seulement : le profil, l'horaire, les jours, la cohorte et le paiement se règlent ensuite sur WhatsApp. */
type Answers = { name: string; phone: string };
const EMPTY: Answers = { name: "", phone: "" };

/* Étapes du formulaire, dans l'ordre. Les libellés « arret » sont ceux de l'onglet Résumé de la feuille Google. */
const STEPS: { key: keyof Answers; arret: string }[] = [
  { key: "name", arret: "Nom et prénom" },
  { key: "phone", arret: "Numéro WhatsApp" },
];
const ALL_FILLED = "Tout rempli, mais pas envoyé";

/** Référence de la pub d'origine : ?ref=… ou ?utm_content=… (gardée pendant la visite). */
function readRef(): string {
  try {
    const q = new URLSearchParams(window.location.search);
    const fromUrl = (q.get("ref") || q.get("utm_content") || "").slice(0, 60);
    if (fromUrl) sessionStorage.setItem(REF_KEY, fromUrl);
    return fromUrl || sessionStorage.getItem(REF_KEY) || "";
  } catch {
    return "";
  }
}

/** Identifiant de la visite : une même personne met à jour sa ligne dans la feuille au lieu d'en créer plusieurs. */
function formId(): string {
  try {
    const saved = sessionStorage.getItem(ID_KEY);
    if (saved) return saved;
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().slice(0, 13) : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(ID_KEY, id);
    return id;
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

/** Au moins un mot de 2 lettres ou plus (un prénom seul suffit). */
const validName = (v: string) => /\p{L}{2,}/u.test(v.trim());
/** Entre 8 et 15 chiffres (espaces, tirets et « + » acceptés). */
const validPhone = (v: string) => /^[+\d\s().-]*$/.test(v.trim()) && (v.match(/\d/g)?.length ?? 0) >= 8 && (v.match(/\d/g)?.length ?? 0) <= 15;

function invalid(a: Answers) {
  return {
    name: !validName(a.name),
    phone: !validPhone(a.phone),
  };
}

/** Première étape non remplie : là où la personne s'est arrêtée. */
function stoppedAt(a: Answers) {
  const bad = invalid(a);
  for (const s of STEPS) {
    if (bad[s.key]) return s.arret;
  }
  return ALL_FILLED;
}

function buildMessage(a: Answers, ref: string) {
  const lines = [
    "Bonjour Doctor Computer Digital Academy,",
    `Je m'appelle ${a.name.trim()}.`,
    "",
    "Je souhaite réserver ma place pour IA PRO 2026, en présentiel à Calavi.",
    "Pouvez-vous m'indiquer les prochaines dates et les horaires disponibles ?",
  ];
  if (ref) lines.push("", `(réf. ${ref})`);
  return lines.join("\n");
}

/** Copie dans Google Sheets (sans effet si l'adresse n'est pas configurée). */
function sendToSheets(a: Answers, etat: "Envoyé" | "Abandon") {
  if (!SHEETS_WEBHOOK_URL) return;
  const payload = JSON.stringify({
    id: formId(),
    etat,
    nom: a.name.trim(),
    whatsapp: a.phone.trim(),
    profil: "",
    horaire: "",
    jours: "",
    demarrage: "",
    paiement: "",
    arret: etat === "Envoyé" ? "" : stoppedAt(a),
    ref: readRef(),
  });
  try {
    const blob = new Blob([payload], { type: "text/plain;charset=UTF-8" });
    if (!navigator.sendBeacon?.(SHEETS_WEBHOOK_URL, blob)) {
      void fetch(SHEETS_WEBHOOK_URL, { method: "POST", mode: "no-cors", body: payload, keepalive: true });
    }
  } catch {
    /* la copie est facultative : WhatsApp reste la voie principale */
  }
}

/**
 * FORMULAIRE DE RÉSERVATION — s'ouvre au clic sur tous les boutons « Réserver ma place »
 * (liens vers REGISTRATION_URL), ou directement avec l'adresse du site suivie de ?reserver.
 * Si le script ne se charge pas, le lien WhatsApp direct reste actif.
 * Deux champs : nom et numéro WhatsApp. Le reste (horaire, jours, cohorte, paiement) se règle sur WhatsApp.
 * Pixel Meta : Lead à l'ouverture du formulaire (le signal sur lequel la campagne optimise,
 * comme l'ancien clic vers WhatsApp), CompleteRegistration à l'envoi.
 * À l'envoi : copie dans Google Sheets, puis ouverture de WhatsApp avec le message pré-rempli.
 * Formulaire commencé puis abandonné (fermé ou page quittée) : copie « Abandon » dans Google Sheets,
 * avec l'étape où la personne s'est arrêtée, dès qu'elle a donné son nom ou son numéro.
 */
export function ReservationForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [a, setA] = useState<Answers>(EMPTY);
  const latest = useRef<Answers>(EMPTY);
  const sent = useRef(false);
  const leadSent = useRef(false);
  const [tried, setTried] = useState(false);
  const set = (k: keyof Answers) => (v: string) =>
    setA((p) => {
      const next = { ...p, [k]: v };
      latest.current = next;
      return next;
    });

  /** Garde une trace d'une inscription commencée mais pas terminée. */
  const saveDraft = useCallback(() => {
    const cur = latest.current;
    if (sent.current || (!cur.name.trim() && !cur.phone.trim())) return;
    sendToSheets(cur, "Abandon");
  }, []);

  const open = useCallback(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    setTried(false);
    d.showModal();
    document.documentElement.classList.add("rf-lock");
    /* Lead : une fois par visite, à l'ouverture du formulaire (même niveau d'intention que l'ancien clic vers WhatsApp). */
    if (!leadSent.current) {
      leadSent.current = true;
      track("Lead", { value: PRICE_VALUE, currency: "XOF", content_name: "Réservation IA PRO 2026" });
    }
  }, []);

  useEffect(() => {
    readRef();
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || link.getAttribute("href") !== REGISTRATION_URL) return;
      e.preventDefault();
      open();
    };
    /* page quittée ou appli mise en arrière-plan avec le formulaire ouvert */
    const onHide = () => {
      if (document.visibilityState === "hidden" && dialog.current?.open) saveDraft();
    };
    const onPageHide = () => {
      if (dialog.current?.open) saveDraft();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onPageHide);
    const d = dialog.current;
    const onClose = () => {
      document.documentElement.classList.remove("rf-lock");
      saveDraft();
    };
    d?.addEventListener("close", onClose);

    /* lien direct vers le formulaire : https://ia-pro-2026.vercel.app/?reserver */
    let timer: number | undefined;
    if (new URLSearchParams(window.location.search).has("reserver")) timer = window.setTimeout(open, 400);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onPageHide);
      d?.removeEventListener("close", onClose);
      if (timer) window.clearTimeout(timer);
    };
  }, [open, saveDraft]);

  const errors = invalid(a);
  const show = (k: keyof typeof errors) => tried && errors[k];


  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    const firstError = (Object.keys(errors) as (keyof typeof errors)[]).find((k) => errors[k]);
    if (firstError) {
      dialog.current?.querySelector<HTMLElement>(`[data-field="${firstError}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    sent.current = true;
    const ref = readRef();
    track("CompleteRegistration", { value: PRICE_VALUE, currency: "XOF", content_name: "Inscription IA PRO 2026" });
    sendToSheets(a, "Envoyé");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(a, ref))}`;
    /* petit délai pour laisser partir le Pixel et la copie Sheets avant de quitter la page */
    window.setTimeout(() => {
      window.location.href = url;
    }, 250);
  }

  return (
    <dialog
      ref={dialog}
      className="rf-dialog"
      aria-labelledby="rf-title"
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <form className="rf-panel" onSubmit={onSubmit} noValidate>
        <div className="rf-head">
          <div>
            <p className="rf-eyebrow">{R.eyebrow}</p>
            <h2 id="rf-title" className="rf-title">
              {R.title}
            </h2>
            <p className="rf-intro">{R.intro}</p>
          </div>
          <button type="button" className="rf-close" onClick={() => dialog.current?.close()} aria-label={R.close}>
            <Icon icon={Cancel01Icon} size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="rf-body">
          <div className="rf-field" data-field="name">
            <label className="rf-label" htmlFor="rf-name">
              {R.nameLabel}
            </label>
            <input
              id="rf-name"
              className="rf-input"
              type="text"
              autoComplete="name"
              placeholder={R.namePlaceholder}
              value={a.name}
              onChange={(e) => set("name")(e.target.value)}
              aria-invalid={show("name") || undefined}
              aria-describedby={show("name") ? "rf-name-err" : undefined}
              maxLength={80}
            />
            {show("name") ? (
              <p id="rf-name-err" className="rf-error">
                {R.nameError}
              </p>
            ) : null}
          </div>

          <div className="rf-field" data-field="phone">
            <label className="rf-label" htmlFor="rf-phone">
              {R.phoneLabel}
            </label>
            <input
              id="rf-phone"
              className="rf-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={R.phonePlaceholder}
              value={a.phone}
              onChange={(e) => set("phone")(e.target.value)}
              aria-invalid={show("phone") || undefined}
              aria-describedby={show("phone") ? "rf-phone-err rf-phone-note" : "rf-phone-note"}
              maxLength={25}
            />
            {show("phone") ? (
              <p id="rf-phone-err" className="rf-error">
                {R.phoneError}
              </p>
            ) : null}
            <p id="rf-phone-note" className="rf-help">
              {R.phoneNote}
            </p>
          </div>

          <div className="rf-benefits">
            <p className="rf-benefits__t">{R.benefitsTitle}</p>
            <ul>
              {R.benefits.map((b) => (
                <li key={b}>
                  <Icon icon={CheckmarkCircle02Icon} size={18} strokeWidth={2} className="rf-benefits__i" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rf-foot">
          <button type="submit" className="rf-submit">
            <Icon icon={WhatsappIcon} size={22} strokeWidth={2} />
            <span>{R.submit}</span>
          </button>
          <p className="rf-note">{R.note}</p>
        </div>
      </form>
    </dialog>
  );
}
