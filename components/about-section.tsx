"use client"

import Image from "next/image"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section id="nosotros" className="py-28 lg:py-40 bg-muted">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about-clinic.jpg"
                alt="Interior de YULI COLORS"
                fill
                className="object-cover"
              />
            </div>
            {/* Gold corner accent */}
            <div className="absolute -bottom-5 -right-5 w-28 h-28 border border-primary/60 -z-10" />
            <div className="absolute -top-5 -left-5 w-16 h-16 border border-primary/30 -z-10" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
                Nuestra Historia
              </p>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-foreground mb-8 leading-[1.15] text-balance">
              La excelencia que se siente en cada detalle
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed text-[0.95rem]">
              <p>
                En <span className="text-foreground font-medium">YULI COLORS</span>,
                la belleza es una forma de arte. Cada tratamiento es una experiencia
                íntimamente personalizada, concebida para realzar lo que ya eres —
                con resultados que se ven y se sienten naturales.
              </p>
              <p>
                Nuestro equipo de especialistas combina técnicas de vanguardia con
                una mirada artística única, empleando la tecnología más avanzada del
                sector para ofrecer resultados de la más alta precisión.
              </p>
              <p>
                Desde micropigmentación artística hasta rituales faciales
                rejuvenecedores, cada servicio se ejecuta con máximo cuidado en un
                entorno diseñado para hacerte sentir exclusiva y en calma.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-border">
              {[
                { value: "10+", label: "Años de experiencia" },
                { value: "5K+", label: "Clientas satisfechas" },
                { value: "15+", label: "Tratamientos premium" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl text-primary mb-1.5 font-light">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wide leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Mid-section WhatsApp CTA */}
            <div className="mt-10">
              <Link
                href="https://wa.me/34912345678?text=Hola,%20me%20gustaría%20solicitar%20más%20información%20sobre%20los%20tratamientos%20de%20YULI%20COLORS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-foreground/70 hover:text-primary transition-colors duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Solicitar valoración gratuita
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
