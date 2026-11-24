"use client";

import { Cancel01Icon, CheckmarkCircle02Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { DEPOSIT_VALUE, PRICE_VALUE, REGISTRATION_URL, SHEETS_WEBHOOK_URL, WHATSAPP_NUMBER } from "@/lib/landing/config";
import { RESERVATION as R } from "@/lib/landing/content.fr";
import { Icon } from "./Icon";
import { track } from "./MetaPixel";

const REF_KEY = "iapro-ref";

type Answers = { name: string; status: string; slot: string; days: string; start: string; pay: string };
const EMPTY: Answers = { name: "", status: "", slot: "", days: "", start: "", pay: "" };

const label = (list: { value: string; label: string; detail?: string }[], v: string) => list.find((o) => o.value === v);

/** Référence de la pub d'origine : ?ref=… ou ?utm_content=… (gardée pendant la visite). */
function readRef(): string {
  try {
    const q = new URLSearchParams(window.location.search);
    const fromUrl = q.get("ref") || q.get("utm_content") || "";
    if (fromUrl) sessionStorage.setItem(REF_KEY, fromUrl.slice(0, 60));
    return fromUrl.slice(0, 60) || sessionStorage.getItem(REF_KEY) || "";
  } catch {
    return "";
  }
}

/** Le nom doit contenir au moins deux mots de 2 lettres ou plus. */
function validName(v: string) {
  const words = v.trim().split(/\s+/).filter((w) => /\p{L}{2,}/u.test(w));
  return words.length >= 2;
}

function buildMessage(a: Answers, ref: string) {
  const slot = label(R.slots, a.slot);
  const days = label(R.days, a.days);
  const start = label(R.starts, a.start);
  const lines = [
    "Bonjour Doctor Computer Digital Academy,",
    `Je m'appelle ${a.name.trim()} (${a.status}).`,
    "",
    "Je souhaite rejoindre IA PRO 2026, en présentiel :",
    `- Horaire : ${slot?.label} (${slot?.detail})`,
    `- Jours : ${days?.detail}`,
    `- Démarrage : ${start?.label}`,
  ];
  if (a.start === "info") {
    lines.push("", "J'aimerais d'abord avoir plus d'informations.");
  } else if (a.pay === "total") {
    lines.push("- Paiement : les 20 000 FCFA en une fois", "", "JE VEUX PAYER.");
  } else {
    lines.push("- Paiement : réservation avec 5 000 FCFA, les 15 000 FCFA restants sur place le premier jour", "", "JE VEUX M'INSCRIRE.");
  }
  if (ref) lines.push("", `(réf. ${ref})`);
  return lines.join("\n");
}

/** Copie de la réponse dans Google Sheets (sans effet si l'adresse n'est pas configurée). */
function sendToSheets(a: Answers, ref: string) {
  if (!SHEETS_WEBHOOK_URL) return;
  const payload = JSON.stringify({
    nom: a.name.trim(),
    statut: a.status,
    horaire: label(R.slots, a.slot)?.detail ?? "",
    jours: label(R.days, a.days)?.detail ?? "",
    demarrage: label(R.starts, a.start)?.label ?? "",
    paiement: a.start === "info" ? "" : a.pay === "total" ? "20 000 FCFA" : "Acompte 5 000 FCFA",
    ref,
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
 * (liens vers REGISTRATION_URL). Si le script ne se charge pas, le lien WhatsApp direct reste actif.
 * À l'envoi : Pixel Meta (Lead si la personne est prête, Contact si elle se renseigne),
 * copie facultative dans Google Sheets, puis ouverture de WhatsApp avec le message pré-rempli.
 */
export function ReservationForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [a, setA] = useState<Answers>(EMPTY);
  const [tried, setTried] = useState(false);
  const set = (k: keyof Answers) => (v: string) => setA((p) => ({ ...p, [k]: v }));

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
    document.addEventListener("click", onClick);
    const d = dialog.current;
    const onClose = () => document.documentElement.classList.remove("rf-lock");
    d?.addEventListener("close", onClose);
    return () => {
      document.removeEventListener("click", onClick);
      d?.removeEventListener("close", onClose);
    };
  }, [open]);

  const needsPay = a.start !== "info";
  const errors = {
    name: !validName(a.name),
    status: !a.status,
    slot: !a.slot,
    days: !a.days,
    start: !a.start,
    pay: needsPay && !a.pay,
  };
  const show = (k: keyof typeof errors) => tried && errors[k];

  const submitLabel = !a.start ? R.submit.empty : a.start === "info" ? R.submit.info : a.pay === "total" ? R.submit.total : a.pay === "acompte" ? R.submit.acompte : R.submit.empty;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    const firstError = (Object.keys(errors) as (keyof typeof errors)[]).find((k) => errors[k]);
    if (firstError) {
      dialog.current?.querySelector<HTMLElement>(`[data-field="${firstError}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const ref = readRef();
    if (a.start === "info") {
      track("Contact", { content_name: "Formulaire IA PRO 2026 (renseignement)" });
    } else {
      track("Lead", {
        value: a.pay === "total" ? PRICE_VALUE : DEPOSIT_VALUE,
        currency: "XOF",
        content_name: a.pay === "total" ? "Inscription IA PRO 2026 (paiement complet)" : "Inscription IA PRO 2026 (acompte)",
      });
    }
    sendToSheets(a, ref);
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

          {needsPay ? (
            <fieldset className="rf-field" data-field="pay">
              <legend className="rf-label">{R.payLabel}</legend>
              <div className="rf-stack">
                {R.pays.map((o) => (
                  <Choice key={o.value} name="rf-pay" value={o.value} checked={a.pay === o.value} onChange={set("pay")} title={o.label} detail={o.detail} wide />
                ))}
              </div>
              {show("pay") ? <p className="rf-error">{R.requiredError}</p> : null}
            </fieldset>
          ) : null}

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
