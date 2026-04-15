"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

const results = [
  {
    image: "/images/result-1.jpg",
    title: "Ritual Facial",
    description: "Piel luminosa, hidratada y visiblemente rejuvenecida",
    tag: "Resultado real",
  },
  {
    image: "/images/result-2.jpg",
    title: "Micropigmentación Artística",
    description: "Cejas definidas con técnica pelo a pelo para un efecto natural",
    tag: "Resultado real",
  },
]

export function ResultsSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section id="resultados" className="py-28 lg:py-40 bg-secondary/40">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
              Resultados
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-foreground mb-5 text-balance leading-[1.15]">
            Transformaciones reales, resultados visibles
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
            Cada imagen refleja nuestro compromiso con la precisión, el arte y el
            cuidado personalizado que ofrecemos a cada clienta.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto">
          {results.map((result, index) => (
            <div
              key={result.title}
              className={`group transition-all duration-1000 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src={result.image}
                  alt={result.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Real result badge */}
                <div className="absolute top-5 left-5">
                  <span className="bg-card/90 backdrop-blur-sm text-foreground text-[10px] tracking-[0.25em] uppercase px-3 py-1.5">
                    {result.tag}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 font-light">
                  {result.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {result.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Inline CTA */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-400 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-serif text-xl md:text-2xl text-foreground mb-2 font-light italic">
            ¿Lista para tu transformación?
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Agenda tu consulta personalizada sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Link href="#contacto">Reservar Cita</Link>
            </Button>
            <Link
              href="https://wa.me/34622886878?text=Hola,%20vi%20vuestros%20resultados%20y%20me%20gustaría%20reservar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-foreground/30 text-foreground/70 hover:border-primary hover:text-primary rounded-none px-10 py-[1.4rem] text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Consultar por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
