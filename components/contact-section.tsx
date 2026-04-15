"use client"

import { useState } from "react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Phone, Mail, CheckCircle2, Instagram, Facebook } from "lucide-react"

const WA_NUMBER = "34622886878"
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hola,%20me%20gustaría%20reservar%20una%20cita%20en%20YULI%20COLORS`

const services = [
  "Rituales Faciales Personalizados",
  "Micropigmentación Artística",
  "Arquitectura de Cejas",
  "Escultura Corporal",
  "Rejuvenecimiento Avanzado",
  "Lifting & Tinte de Pestañas",
  "Otro / No lo sé aún",
]

const contactInfo = [
  {
    icon: MapPin,
    label: "Ubicación",
    lines: ["Camas, Sevilla"],
  },
  {
    icon: Clock,
    label: "Horario",
    lines: ["Lunes – Viernes: 10:00 – 20:00", "Sábados: 10:00 – 15:00"],
  },
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    lines: ["622 886 878"],
    href: "tel:+34622886878",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["hola@yulicolors.es"],
    href: "mailto:hola@yulicolors.es",
  },
]

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.08 })
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call — replace with real endpoint
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section id="contacto" className="py-28 lg:py-40 bg-muted">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — info + WhatsApp */}
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
                Contacto
              </p>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-foreground mb-5 leading-[1.15] text-balance">
              Reserva tu cita
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 text-[0.95rem] max-w-md">
              Estamos aquí para guiarte hacia tu mejor versión. Contáctanos y agenda
              tu consulta personalizada, sin compromiso.
            </p>

            {/* WhatsApp — primary CTA */}
            <Link
              href="https://wa.me/34622886878?text=Hola,%20me%20gustaría%20reservar%20una%20cita%20en%20YULI%20COLORS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white hover:bg-[#1fb85a] px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 mb-12 rounded-none"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contactar por WhatsApp
            </Link>

            {/* Contact details */}
            <div className="space-y-7">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 flex items-center justify-center border border-border flex-shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-foreground/50 mb-1.5">
                      {item.label}
                    </p>
                    {item.lines.map((line) =>
                      item.href ? (
                        <a key={line} href={item.href} className="text-sm text-foreground/80 leading-snug hover:text-primary transition-colors block">
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-foreground/80 leading-snug">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center border border-border flex-shrink-0">
                  <Instagram className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-foreground/50 mb-2">Redes sociales</p>
                  <div className="flex gap-3">
                    <Link
                      href="https://instagram.com/yulicolors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      @yulicolors
                    </Link>
                    <Link
                      href="https://facebook.com/yulicolors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      @yulicolors
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="bg-card p-10 lg:p-12 border border-border/50">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] gap-5">
                  <div className="w-14 h-14 flex items-center justify-center border border-primary/30 rounded-full">
                    <CheckCircle2 className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground font-light">
                    ¡Solicitud recibida!
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    Nos pondremos en contacto contigo en menos de 24 horas para confirmar tu cita.
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    O si lo prefieres, escríbenos directamente por WhatsApp.
                  </p>
                  <Link
                    href="https://wa.me/34622886878?text=Hola,%20acabo%20de%20enviar%20una%20solicitud%20de%20cita%20en%20YULI%20COLORS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-primary hover:text-primary/80 transition-colors mt-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Escribir por WhatsApp
                  </Link>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl text-foreground mb-1.5 font-light">
                    Solicitar cita
                  </h3>
                  <p className="text-xs text-muted-foreground mb-8 tracking-wide">
                    Te respondemos en menos de 24 horas.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs tracking-[0.12em] uppercase text-muted-foreground mb-2">
                        Nombre
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="rounded-none border-border/70 focus:border-primary h-12 bg-background text-sm"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs tracking-[0.12em] uppercase text-muted-foreground mb-2">
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="rounded-none border-border/70 focus:border-primary h-12 bg-background text-sm"
                        placeholder="+34 600 000 000"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="block text-xs tracking-[0.12em] uppercase text-muted-foreground mb-2">
                        Tratamiento de interés
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        required
                        className="w-full h-12 px-3 border border-border/70 bg-background text-foreground text-sm focus:border-primary focus:outline-none transition-colors rounded-none"
                      >
                        <option value="">Selecciona un tratamiento</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs tracking-[0.12em] uppercase text-muted-foreground mb-2">
                        Mensaje <span className="normal-case text-muted-foreground/50">(opcional)</span>
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-3 border border-border/70 bg-background text-foreground text-sm focus:border-primary focus:outline-none transition-colors rounded-none resize-none"
                        placeholder="Cuéntanos brevemente qué buscas…"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                    >
                      {loading ? "Enviando…" : "Enviar Solicitud"}
                    </Button>

                    <p className="text-[11px] text-muted-foreground/50 text-center leading-relaxed">
                      Al enviar aceptas nuestra{" "}
                      <Link href="#" className="underline hover:text-primary transition-colors">
                        Política de Privacidad
                      </Link>
                      .
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
