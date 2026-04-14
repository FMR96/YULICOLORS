"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-beauty.jpg"
          alt="Tratamiento de belleza premium en YULI COLORS"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dual-layer overlay for depth and legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Eyebrow label */}
          <p className="text-card/70 text-xs md:text-sm tracking-[0.4em] uppercase mb-8 opacity-0 animate-fade-in-up font-light">
            Centro de Estética Premium
          </p>

          {/* Main headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl font-light text-card leading-[1.05] mb-7 opacity-0 animate-fade-in-up animation-delay-100 text-balance">
            Tu belleza,<br />
            <span className="italic">elevada.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-card/85 text-base md:text-lg lg:text-xl font-light max-w-xl mx-auto mb-12 opacity-0 animate-fade-in-up animation-delay-200 leading-relaxed tracking-wide">
            Tratamientos estéticos de alta precisión, diseñados exclusivamente para realzar tu belleza natural con resultados que perduran.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up animation-delay-300">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-7 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 w-full sm:w-auto min-w-[220px]"
            >
              <Link href="#contacto">Reservar Cita</Link>
            </Button>
            <Link
              href="https://wa.me/34912345678?text=Hola,%20me%20gustaría%20reservar%20una%20cita%20en%20YULI%20COLORS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-card/60 text-card hover:bg-card hover:text-foreground rounded-none px-10 py-[1.625rem] text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto min-w-[220px] justify-center"
            >
              <WhatsAppIcon />
              Contactar por WhatsApp
            </Link>
          </div>

          {/* Trust micro-line */}
          <p className="text-card/45 text-xs tracking-widest uppercase mt-10 opacity-0 animate-fade-in animation-delay-400">
            Más de 5.000 clientas · 10 años de excelencia
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
        <Link
          href="#nosotros"
          className="flex flex-col items-center gap-2 text-card/50 hover:text-card/90 transition-colors duration-300"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase">Descubrir</span>
          <ArrowDown size={16} className="animate-bounce" />
        </Link>
      </div>
    </section>
  )
}
