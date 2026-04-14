"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

export function CTASection() {
  const { ref, isInView } = useInView({ threshold: 0.25 })

  return (
    <section className="py-28 lg:py-40 bg-secondary relative overflow-hidden">
      {/* Subtle geometric background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/8 rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/5 rotate-45" />
      </div>

      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-primary" />
            <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
              Empieza hoy
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[3rem] font-light text-foreground mb-5 text-balance leading-[1.1]">
            Tu mejor versión<br />
            <span className="italic">te está esperando.</span>
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto text-[0.95rem]">
            Agenda tu cita en YULI COLORS y descubre cómo un tratamiento personalizado
            puede cambiar la forma en que te ves — y cómo te sientes.
          </p>

          {/* 3-button CTA cluster */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary */}
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-7 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Link href="#contacto">Reservar Cita</Link>
            </Button>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/34912345678?text=Hola,%20me%20gustaría%20reservar%20una%20cita%20en%20YULI%20COLORS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white hover:bg-[#1fb85a] rounded-none px-10 py-[1.625rem] text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </Link>

            {/* Secondary: consultation */}
            <Link
              href="#contacto"
              className="flex items-center justify-center border border-foreground/25 text-foreground/65 hover:border-primary hover:text-primary rounded-none px-10 py-[1.625rem] text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Solicitar Valoración
            </Link>
          </div>

          {/* Reassurance micro-copy */}
          <p className="text-muted-foreground/60 text-xs tracking-wide mt-8">
            Sin compromiso · Respuesta en menos de 24 horas
          </p>
        </div>
      </div>
    </section>
  )
}
