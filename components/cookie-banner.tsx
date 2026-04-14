"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ChevronDown, ChevronUp } from "lucide-react"

const CONSENT_KEY = "yuli_cookie_consent"

export type CookieConsent = "all" | "essential" | null

function getStoredConsent(): CookieConsent {
  if (typeof window === "undefined") return null
  return (localStorage.getItem(CONSENT_KEY) as CookieConsent) ?? null
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 700)
      return () => clearTimeout(t)
    }
  }, [])

  const saveConsent = (type: "all" | "essential" | "custom") => {
    if (type === "all") {
      localStorage.setItem(CONSENT_KEY, "all")
    } else if (type === "essential") {
      localStorage.setItem(CONSENT_KEY, "essential")
    } else {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ essential: true, analytics, marketing })
      )
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop blur on mobile for readability */}
      <div className="fixed inset-0 z-[98] bg-foreground/10 lg:hidden pointer-events-none" />

      <div
        className={`fixed bottom-0 left-0 right-0 z-[99] transition-transform duration-500 ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Gold top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="bg-foreground/97 backdrop-blur-sm text-card border-t border-card/10">
          <div className="container mx-auto px-6 lg:px-12 py-6">

            {/* Main row */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">

              {/* Icon + text */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-8 h-8 flex items-center justify-center border border-primary/40 flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="font-serif text-sm text-card font-light mb-1">
                    Tu privacidad nos importa
                  </p>
                  <p className="text-card/50 text-xs leading-relaxed max-w-2xl">
                    Usamos cookies propias y de terceros para mejorar tu experiencia y
                    analizar el tráfico. Puedes aceptarlas todas, rechazar las no esenciales
                    o{" "}
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="text-primary/80 hover:text-primary underline transition-colors inline-flex items-center gap-0.5"
                    >
                      personalizar
                      {expanded ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                    {" "}tus preferencias. Más info en nuestra{" "}
                    <Link
                      href="/cookies"
                      className="text-primary/80 hover:text-primary underline transition-colors"
                    >
                      Política de cookies
                    </Link>
                    {" "}y{" "}
                    <Link
                      href="/privacidad"
                      className="text-primary/80 hover:text-primary underline transition-colors"
                    >
                      Política de privacidad
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                <button
                  onClick={() => saveConsent("essential")}
                  className="px-6 py-3 border border-card/20 text-card/55 hover:border-card/50 hover:text-card/80 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={() => saveConsent("all")}
                  className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                >
                  Aceptar todas
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => saveConsent("essential")}
                className="hidden lg:flex w-8 h-8 items-center justify-center text-card/30 hover:text-card/70 transition-colors flex-shrink-0"
                aria-label="Cerrar — solo esenciales"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Expanded preferences panel */}
            {expanded && (
              <div className="mt-5 pt-5 border-t border-card/10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-card/40 mb-4 font-light">
                  Personalizar preferencias
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mb-5">
                  {/* Essential — always on */}
                  <div className="flex items-start justify-between gap-4 p-4 border border-card/10">
                    <div>
                      <p className="text-xs font-medium text-card mb-1">Esenciales</p>
                      <p className="text-[11px] text-card/45 leading-relaxed">
                        Necesarias para el funcionamiento básico de la web.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-9 h-5 bg-primary/60 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-60">
                        <div className="w-3.5 h-3.5 rounded-full bg-card" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-start justify-between gap-4 p-4 border border-card/10">
                    <div>
                      <p className="text-xs font-medium text-card mb-1">Analíticas</p>
                      <p className="text-[11px] text-card/45 leading-relaxed">
                        Nos ayudan a entender cómo usas la web (Google Analytics).
                      </p>
                    </div>
                    <button
                      onClick={() => setAnalytics(!analytics)}
                      className={`flex-shrink-0 w-9 h-5 rounded-full flex items-center transition-all duration-300 px-1 ${
                        analytics ? "bg-primary justify-end" : "bg-card/20 justify-start"
                      }`}
                      aria-pressed={analytics}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-card shadow-sm" />
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-start justify-between gap-4 p-4 border border-card/10">
                    <div>
                      <p className="text-xs font-medium text-card mb-1">Marketing</p>
                      <p className="text-[11px] text-card/45 leading-relaxed">
                        Publicidad personalizada y seguimiento de conversiones.
                      </p>
                    </div>
                    <button
                      onClick={() => setMarketing(!marketing)}
                      className={`flex-shrink-0 w-9 h-5 rounded-full flex items-center transition-all duration-300 px-1 ${
                        marketing ? "bg-primary justify-end" : "bg-card/20 justify-start"
                      }`}
                      aria-pressed={marketing}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-card shadow-sm" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => saveConsent("custom")}
                  className="px-8 py-3 bg-card/10 text-card/70 hover:bg-card/20 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
                >
                  Guardar preferencias
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
