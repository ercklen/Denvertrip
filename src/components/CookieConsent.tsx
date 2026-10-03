"use client";

import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   Types & constants
───────────────────────────────────────────── */
const CONSENT_KEY = "cookie_consent";

type ConsentPrefs = {
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
};

/* ─────────────────────────────────────────────
   gtag helper — updates Consent Mode v2
   Called after user makes a choice.
───────────────────────────────────────────── */
function gtagUpdate(prefs: ConsentPrefs) {
  if (typeof window === "undefined") return;
  const w = window as unknown as Record<string, unknown>;
  if (typeof w["gtag"] !== "function") return;
  const fn = w["gtag"] as (...args: unknown[]) => void;
  fn("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.advertising ? "granted" : "denied",
    ad_user_data: prefs.advertising ? "granted" : "denied",
    ad_personalization: prefs.personalization ? "granted" : "denied",
  });
}

/* ─────────────────────────────────────────────
   Toggle switch UI
───────────────────────────────────────────── */
function Toggle({
  checked,
  onChange,
  disabled,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={id}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        position: "relative",
        width: "46px",
        height: "26px",
        borderRadius: "13px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        background: checked
          ? "#c9a84c"
          : disabled
          ? "rgba(201,168,76,0.3)"
          : "rgba(255,255,255,0.15)",
        transition: "background 0.25s ease",
        flexShrink: 0,
        outline: "none",
        padding: 0,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "4px",
          left: checked ? "24px" : "4px",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.25s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
          display: "block",
        }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────
   Single category row in the customize panel
───────────────────────────────────────────── */
function CategoryRow({
  label,
  desc,
  checked,
  onChange,
  disabled,
  alwaysActive,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  alwaysActive?: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "#f0ebe0",
            lineHeight: 1.4,
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: "0.775rem",
            color: "rgba(240,235,224,0.55)",
            lineHeight: 1.55,
          }}
        >
          {desc}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
          paddingTop: "2px",
        }}
      >
        {alwaysActive && (
          <span
            style={{
              fontSize: "0.68rem",
              color: "#c9a84c",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Toujours actif
          </span>
        )}
        <Toggle
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={label}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [view, setView] = useState<"banner" | "customize">("banner");
  const [prefs, setPrefs] = useState<ConsentPrefs>({
    analytics: false,
    advertising: false,
    personalization: false,
  });

  /* On mount: check for existing consent */
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // First visit — show banner
      setShow(true);
    } else {
      try {
        const parsed: ConsentPrefs = JSON.parse(stored);
        setPrefs(parsed);
        // Re-apply consent for this session (gtag may not be ready yet,
        // so we defer slightly to let the gtag.js script load)
        setTimeout(() => gtagUpdate(parsed), 500);
      } catch {
        // Corrupt data — treat as first visit
        localStorage.removeItem(CONSENT_KEY);
        setShow(true);
      }
    }

    /* Listen for clicks on "Cookie Settings" links anywhere on the page */
    const handleCookieLink = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".cookie-settings-link")) {
        e.preventDefault();
        const s = localStorage.getItem(CONSENT_KEY);
        if (s) {
          try {
            setPrefs(JSON.parse(s));
          } catch { /* ignore */ }
        }
        setView("customize");
        setShow(true);
      }
    };
    document.addEventListener("click", handleCookieLink);
    return () => document.removeEventListener("click", handleCookieLink);
  }, []);

  /* Persist choice and update gtag */
  const persist = useCallback((p: ConsentPrefs) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(p));
    gtagUpdate(p);
    setShow(false);
    setView("banner");
  }, []);

  const acceptAll = () =>
    persist({ analytics: true, advertising: true, personalization: true });

  const rejectAll = () =>
    persist({ analytics: false, advertising: false, personalization: false });

  const saveCustom = () => persist(prefs);

  const toggle = (key: keyof ConsentPrefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  if (!show) return null;

  /* ── Shared button styles ── */
  const btnBase: React.CSSProperties = {
    borderRadius: "8px",
    fontSize: "0.82rem",
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    padding: "10px 18px",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    border: "none",
    lineHeight: 1.4,
  };

  return (
    <>
      {/* ── Backdrop (only in customize view) ── */}
      {view === "customize" && (
        <div
          onClick={() => setView("banner")}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 99998,
          }}
        />
      )}

      {/* ── Panel container ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* ════════════════════════════════
            BANNER VIEW
        ════════════════════════════════ */}
        {view === "banner" && (
          <div
            style={{
              background: "linear-gradient(to top, #090909 0%, #111 100%)",
              borderTop: "1px solid rgba(201,168,76,0.4)",
              boxShadow: "0 -10px 48px rgba(0,0,0,0.7)",
              padding: "18px 24px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Left: icon + text */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                flex: "1 1 280px",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                🍪
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#f0ebe0",
                    letterSpacing: "0.01em",
                  }}
                >
                  Nous utilisons des cookies
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "0.775rem",
                    color: "rgba(240,235,224,0.6)",
                    lineHeight: 1.55,
                  }}
                >
                  Nous utilisons des cookies et technologies similaires pour
                  assurer le fonctionnement du site, mesurer l&apos;audience et
                  améliorer nos services. Vous pouvez accepter ou refuser les
                  cookies non essentiels.{" "}
                  <a
                    href="/privacy"
                    style={{
                      color: "#c9a84c",
                      textDecoration: "underline",
                      fontSize: "0.75rem",
                    }}
                  >
                    Politique de confidentialité
                  </a>
                </p>
              </div>
            </div>

            {/* Right: buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
                flexShrink: 0,
              }}
            >
              <button
                id="cookie-btn-customize"
                onClick={() => setView("customize")}
                style={{
                  ...btnBase,
                  background: "transparent",
                  border: "1px solid rgba(201,168,76,0.4)",
                  color: "#c9a84c",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(201,168,76,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                Personnaliser
              </button>

              <button
                id="cookie-btn-reject"
                onClick={rejectAll}
                style={{
                  ...btnBase,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(240,235,224,0.8)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.06)";
                }}
              >
                Refuser
              </button>

              <button
                id="cookie-btn-accept-all"
                onClick={acceptAll}
                style={{
                  ...btnBase,
                  background: "#c9a84c",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  boxShadow: "0 2px 16px rgba(201,168,76,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#d4b45a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#c9a84c";
                }}
              >
                Tout accepter
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════
            CUSTOMIZE PANEL VIEW
        ════════════════════════════════ */}
        {view === "customize" && (
          <div
            style={{
              background: "#111",
              borderTop: "1px solid rgba(201,168,76,0.4)",
              borderRadius: "18px 18px 0 0",
              padding: "28px 24px 28px",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 -16px 56px rgba(0,0,0,0.7)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px" }}>🍪</span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#f0ebe0",
                    letterSpacing: "0.02em",
                  }}
                >
                  Préférences de cookies
                </h2>
              </div>
              <button
                onClick={() => setView("banner")}
                aria-label="Fermer"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(240,235,224,0.45)",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            <p
              style={{
                margin: "0 0 22px",
                fontSize: "0.8rem",
                color: "rgba(240,235,224,0.55)",
                lineHeight: 1.65,
              }}
            >
              Gérez vos préférences ci-dessous. Les cookies nécessaires sont
              toujours actifs car ils assurent le bon fonctionnement du site.{" "}
              <a
                href="/privacy"
                style={{ color: "#c9a84c", textDecoration: "underline" }}
              >
                Politique de confidentialité
              </a>
            </p>

            {/* ── Category rows ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "22px",
              }}
            >
              <CategoryRow
                label="Cookies nécessaires"
                desc="Indispensables au fonctionnement du site (navigation, sécurité, préférences). Ils ne peuvent pas être désactivés."
                checked={true}
                onChange={() => {}}
                disabled
                alwaysActive
              />
              <CategoryRow
                label="Mesure d'audience / Analytics"
                desc="Nous permettent de comprendre comment vous utilisez le site afin de l'améliorer (Google Analytics via GTM)."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <CategoryRow
                label="Publicité"
                desc="Utilisés pour diffuser des annonces pertinentes et mesurer leur efficacité (Google Ads, Google AdSense)."
                checked={prefs.advertising}
                onChange={(v) => setPrefs((p) => ({ ...p, advertising: v }))}
              />
              <CategoryRow
                label="Personnalisation publicitaire"
                desc="Permettent de personnaliser les annonces selon votre profil et vos centres d'intérêt (ad_personalization)."
                checked={prefs.personalization}
                onChange={(v) => setPrefs((p) => ({ ...p, personalization: v }))}
              />
            </div>

            {/* ── Action buttons ── */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                id="cookie-btn-save-custom"
                onClick={saveCustom}
                style={{
                  ...btnBase,
                  flex: "1 1 140px",
                  background: "transparent",
                  border: "1px solid rgba(201,168,76,0.5)",
                  color: "#c9a84c",
                  padding: "12px 16px",
                  fontSize: "0.85rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(201,168,76,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                Enregistrer mes choix
              </button>
              <button
                id="cookie-btn-accept-all-2"
                onClick={acceptAll}
                style={{
                  ...btnBase,
                  flex: "1 1 140px",
                  background: "#c9a84c",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  padding: "12px 16px",
                  fontSize: "0.85rem",
                  boxShadow: "0 2px 16px rgba(201,168,76,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#d4b45a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#c9a84c";
                }}
              >
                Tout accepter
              </button>
            </div>

            {/* Reject link at bottom */}
            <p style={{ textAlign: "center", marginTop: "14px", marginBottom: 0 }}>
              <button
                onClick={rejectAll}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(240,235,224,0.4)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontFamily: "Inter, sans-serif",
                  padding: 0,
                }}
              >
                Tout refuser
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
