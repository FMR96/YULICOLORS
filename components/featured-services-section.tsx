"use client"

import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

const WA_BASE =
  "https://wa.me/34912345678?text=Hola,%20me%20interesa%20el%20tratamiento%20de%20"

const heroCards = [
  {
    num: "01",
    category: "Micropigmentación",
    title: "Micropigmentación de Cejas",
    tagline:
      "Arte semipermanente que define y realza tu mirada para siempre. Resultados naturales, personalizados, que duran hasta dos años.",
    wa: `${WA_BASE}${encodeURIComponent("Micropigmentación de Cejas")}%20en%20YULI%20COLORS`,
  },
  {
    num: "02",
    category: "Micropigmentación",
    title: "Micropigmentación de Labios",
    tagline:
      "Redefinición, armonía y color duradero para una sonrisa siempre perfecta. Acabado natural o más intenso — siempre a tu medida.",
    wa: `${WA_BASE}${encodeURIComponent("Micropigmentación de Labios")}%20en%20YULI%20COLORS`,
  },
]

const secondaryCards = [
  {
    num: "03",
    category: "Depilación",
    title: "Depilación Láser",
    tagline:
      "Tecnología de última generación para una piel definitivamente suave. Segura para todos los fototipos.",
    wa: `${WA_BASE}${encodeURIComponent("Depilación Láser")}%20en%20YULI%20COLORS`,
  },
  {
    num: "04",
    category: "Tratamientos Faciales",
    title: "Rituales Faciales Personalizados",
    tagline:
      "Protocolos exclusivos de limpieza, hidratación y luminosidad adaptados a las necesidades únicas de tu piel.",
    wa: `${WA_BASE}${encodeURIComponent("Tratamientos Faciales")}%20en%20YULI%20COLORS`,
  },
  {
    num: "05",
    category: "Cejas & Pestañas",
    title: "Lifting de Pestañas",
    tagline:
      "Curvado semipermanente que eleva y abre la mirada de forma completamente natural. Sin extensiones.",
    wa: `${WA_BASE}${encodeURIComponent("Lifting de Pestañas")}%20en%20YULI%20COLORS`,
  },
]

function ServiceCard({
  num,
  category,
  title,
  tagline,
  wa,
  size = "normal",
  delay = 0,
  isInView,
}: {
  num: string
  category: string
  title: string
  tagline: string
  wa: string
  size?: "large" | "normal"
  delay?: number
  isInView: boolean
}) {
  return (
    <div
      className={`group relative border border-card/10 hover:border-primary/25 transition-all duration-500 flex flex-col justify-between bg-transparent hover:bg-card/4 ${
        size === "large" ? "p-10 lg:p-12 min-h-[240px]" : "p-8 lg:p-10 min-h-[200px]"
      } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Top: number + category */}
      <div className="flex items-start justify-between mb-6">
        <span
          className={`font-serif font-light text-primary/25 leading-none ${
            size === "large" ? "text-5xl" : "text-4xl"
          }`}
        >
          {num}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-card/30 font-light mt-1">
          {category}
        </span>
      </div>

      {/* Title + tagline */}
      <div className="flex-1">
        <h3
          className={`font-serif font-light text-card leading-snug mb-3 ${
            size === "large" ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {title}
        </h3>
        <p className="text-card/50 text-sm leading-relaxed">{tagline}</p>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-5 mt-8">
        <Link
          href="#contacto"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-card/40 hover:text-primary transition-colors duration-300 group/link"
        >
          Reservar cita
          <span className="transition-transform duration-300 group-hover/link:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-card/30 hover:text-[#25D366] transition-colors duration-300"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          WhatsApp
        </Link>
      </div>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
    </div>
  )
}

export function FeaturedServicesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section className="py-28 lg:py-40 bg-foreground text-card overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
                Tratamientos Destacados
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-[1.15] max-w-lg text-balance">
              Los tratamientos que nos definen
            </h2>
          </div>
          <Link
            href="#servicios"
            className="flex-shrink-0 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-card/45 hover:text-primary transition-colors duration-300 group"
          >
            Ver todos los tratamientos
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Row 1: 2 large hero cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-px bg-card/10">
          {heroCards.map((card, i) => (
            <ServiceCard
              key={card.num}
              {...card}
              size="large"
              delay={i * 100 + 100}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Row 2: 3 secondary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-card/10">
          {secondaryCards.map((card, i) => (
            <ServiceCard
              key={card.num}
              {...card}
              size="normal"
              delay={i * 80 + 300}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 pt-10 border-t border-card/10 transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-card/40 text-sm text-center sm:text-left">
            Todos nuestros tratamientos incluyen consulta previa personalizada sin coste.
          </p>
          <Link
            href="#servicios"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-card/20 text-card/55 hover:border-primary hover:text-primary px-8 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          >
            Explorar catálogo completo
          </Link>
        </div>
      </div>
    </section>
  )
}
