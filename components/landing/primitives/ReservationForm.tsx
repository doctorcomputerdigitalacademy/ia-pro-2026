"use client";

import { Cancel01Icon, CheckmarkCircle02Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { DEPOSIT_VALUE, PRICE_VALUE, REGISTRATION_URL, SHEETS_WEBHOOK_URL, WHATSAPP_NUMBER } from "@/lib/landing/config";
import { RESERVATION as R } from "@/lib/landing/content.fr";
import { Icon } from "./Icon";
import { track } from "./MetaPixel";

const REF_KEY = "iapro-ref";
const ID_KEY = "iapro-form-id";

type Answers = { name: string; phone: string; status: string; slot: string; days: string; start: string; pay: string };
const EMPTY: Answers = { name: "", phone: "", status: "", slot: "", days: "", start: "", pay: "" };

/* Étapes du formulaire, dans l'ordre. Les libellés « arret » sont ceux de l'onglet Résumé de la feuille Google. */
const STEPS: { key: keyof Answers | "slotdays"; arret: string }[] = [
  { key: "name", arret: "Nom et prénom" },
  { key: "phone", arret: "Numéro WhatsApp" },
  { key: "status", arret: "Profil" },
  { key: "slotdays", arret: "Disponibilité et jours" },
  { key: "start", arret: "Cohorte" },
  { key: "pay", arret: "Paiement" },
];
const ALL_FILLED = "Tout rempli, mais pas envoyé";

const find = (list: { value: string; label: string; detail?: string }[], v: string) => list.find((o) => o.value === v);

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

/** Au moins deux mots de 2 lettres ou plus. */
const validName = (v: string) => v.trim().split(/\s+/).filter((w) => /\p{L}{2,}/u.test(w)).length >= 2;
/** Entre 8 et 15 chiffres (espaces, tirets et « + » acceptés). */
const validPhone = (v: string) => /^[+\d\s().-]*$/.test(v.trim()) && (v.match(/\d/g)?.length ?? 0) >= 8 && (v.match(/\d/g)?.length ?? 0) <= 15;

function invalid(a: Answers) {
  return {
    name: !validName(a.name),
    phone: !validPhone(a.phone),
    status: !a.status,
    slot: !a.slot,
    days: !a.days,
    start: !a.start,
    pay: !a.pay,
  };
}

/** Première étape non remplie : là où la personne s'est arrêtée. */
function stoppedAt(a: Answers) {
  const bad = invalid(a);
  for (const s of STEPS) {
    if (s.key === "slotdays" ? bad.slot || bad.days : bad[s.key as keyof typeof bad]) return s.arret;
  }
  return ALL_FILLED;
}

function buildMessage(a: Answers, ref: string) {
  const slot = find(R.slots, a.slot);
  const days = find(R.days, a.days);
  const start = find(R.starts, a.start);
  const lines = [
    "Bonjour Doctor Computer Digital Academy,",
    `Je m'appelle ${a.name.trim()} (${a.status}).`,
    "",
    "Je souhaite rejoindre IA PRO 2026, en présentiel :",
    `- Disponibilité : ${slot?.label} (${slot?.detail})`,
    `- Jours : ${days?.detail}`,
    `- Cohorte : ${start?.label}`,
  ];
  if (a.pay === "total") {
    lines.push("- Paiement : les 20 000 FCFA en une fois", "", "JE VEUX PAYER.");
  } else {
    lines.push("- Paiement : réservation avec 5 000 FCFA, les 15 000 FCFA restants sur place le premier jour", "", "JE VEUX M'INSCRIRE.");
  }
  if (ref) lines.push("", `(réf. ${ref})`);
  return lines.join("\n");
}

/** Copie dans Google Sheets (sans effet si l'adresse n'est pas configurée). */
function sendToSheets(a: Answers, etat: "Envoyé" | "Abandon") {
  if (!SHEETS_WEBHOOK_URL) return;
  const slot = find(R.slots, a.slot);
  const payload = JSON.stringify({
    id: formId(),
    etat,
    nom: a.name.trim(),
    whatsapp: a.phone.trim(),
    profil: a.status,
    horaire: slot ? `${slot.label} (${slot.detail})` : "",
    jours: find(R.days, a.days)?.detail ?? "",
    demarrage: find(R.starts, a.start)?.label ?? "",
    paiement: find(R.pays, a.pay)?.label ?? "",
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

function Choice({
  name,
  value,
  checked,
  onChange,
  title,
  detail,
  wide,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  title: string;
  detail?: string;
  wide?: boolean;
}) {
  return (
    <label className={`rf-choice${wide ? " rf-choice--wide" : ""}${checked ? " is-on" : ""}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} />
      <span className="rf-choice__t">{title}</span>
      {detail ? <span className="rf-choice__d">{detail}</span> : null}
    </label>
  );
}

/**
 * FORMULAIRE DE RÉSERVATION — s'ouvre au clic sur tous les boutons « Réserver ma place »
 * (liens vers REGISTRATION_URL), ou directement avec l'adresse du site suivie de ?reserver.
 * Si le script ne se charge pas, le lien WhatsApp direct reste actif.
 * À l'envoi : Pixel Meta (Lead, avec la valeur du paiement ou de l'acompte),
 * copie dans Google Sheets, puis ouverture de WhatsApp avec le message pré-rempli.
 * Formulaire commencé puis abandonné (fermé ou page quittée) : copie « Abandon » dans Google Sheets,
 * avec l'étape où la personne s'est arrêtée, dès qu'elle a donné son nom ou son numéro.
 */
export function ReservationForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [a, setA] = useState<Answers>(EMPTY);
  const latest = useRef<Answers>(EMPTY);
  const sent = useRef(false);
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
    track("InitiateCheckout", { content_name: "Formulaire IA PRO 2026" });
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

  const submitLabel = a.pay === "total" ? R.submit.total : a.pay === "acompte" ? R.submit.acompte : R.submit.empty;

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
    track("Lead", {
      value: a.pay === "total" ? PRICE_VALUE : DEPOSIT_VALUE,
      currency: "XOF",
      content_name: a.pay === "total" ? "Inscription IA PRO 2026 (paiement complet)" : "Inscription IA PRO 2026 (acompte)",
    });
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

          <fieldset className="rf-field" data-field="status">
            <legend className="rf-label">{R.statusLabel}</legend>
            <div className="rf-chips">
              {R.statuses.map((s) => (
                <Choice key={s} name="rf-status" value={s} checked={a.status === s} onChange={set("status")} title={s} />
              ))}
            </div>
            {show("status") ? <p className="rf-error">{R.requiredError}</p> : null}
          </fieldset>

          <fieldset className="rf-field" data-field="slot">
            <legend className="rf-label">{R.slotLabel}</legend>
            <div className="rf-grid">
              {R.slots.map((o) => (
                <Choice key={o.value} name="rf-slot" value={o.value} checked={a.slot === o.value} onChange={set("slot")} title={o.label} detail={o.detail} />
              ))}
            </div>
            {show("slot") ? <p className="rf-error">{R.requiredError}</p> : null}
          </fieldset>

          <fieldset className="rf-field" data-field="days">
            <legend className="rf-label">{R.daysLabel}</legend>
            <div className="rf-grid">
              {R.days.map((o) => (
                <Choice key={o.value} name="rf-days" value={o.value} checked={a.days === o.value} onChange={set("days")} title={o.label} detail={o.detail} />
              ))}
            </div>
            {show("days") ? <p className="rf-error">{R.requiredError}</p> : null}
          </fieldset>

          <fieldset className="rf-field" data-field="start">
            <legend className="rf-label">{R.startLabel}</legend>
            <div className="rf-stack">
              {R.starts.map((o) => (
                <Choice key={o.value} name="rf-start" value={o.value} checked={a.start === o.value} onChange={set("start")} title={o.label} wide />
              ))}
            </div>
            {show("start") ? <p className="rf-error">{R.requiredError}</p> : null}
          </fieldset>

          <fieldset className="rf-field" data-field="pay">
              <legend className="rf-label">{R.payLabel}</legend>
              <div className="rf-stack">
                {R.pays.map((o) => (
                  <Choice key={o.value} name="rf-pay" value={o.value} checked={a.pay === o.value} onChange={set("pay")} title={o.label} detail={o.detail} wide />
                ))}
              </div>
              {show("pay") ? <p className="rf-error">{R.requiredError}</p> : null}
            </fieldset>

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
            <span>{submitLabel}</span>
          </button>
          <p className="rf-note">{R.note}</p>
        </div>
      </form>
    </dialog>
  );
}
