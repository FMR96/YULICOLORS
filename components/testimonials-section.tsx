"use client"

import { useInView } from "@/hooks/use-in-view"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María G.",
    treatment: "Micropigmentación Artística",
    content:
      "El resultado superó todas mis expectativas. Las cejas quedaron absolutamente naturales — como si fueran mías de siempre. El equipo fue delicado y profesional en cada paso.",
    rating: 5,
    initial: "M",
  },
  {
    name: "Carolina L.",
    treatment: "Ritual Facial Personalizado",
    content:
      "Mi piel nunca había lucido así. El protocolo fue completamente adaptado a mis necesidades y noté la diferencia desde la primera sesión. Volveré, sin duda.",
    rating: 5,
    initial: "C",
  },
  {
    name: "Ana M.",
    treatment: "Rejuvenecimiento Avanzado",
    content:
      "Un lugar donde realmente se preocupan por ti. Los resultados son visibles, naturales y duraderos. El ambiente es tan cuidado que ya el hecho de entrar es un placer.",
    rating: 5,
    initial: "A",
  },
]

const StarRow = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
    ))}
  </div>
)

export function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="testimonios" className="py-28 lg:py-40 bg-muted">
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
              Testimonios
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-foreground mb-5 text-balance leading-[1.15]">
            Lo que dicen quienes ya nos conocen
          </h2>

          {/* Aggregate rating badge */}
          <div className="inline-flex items-center gap-3 mt-3 bg-card px-5 py-3 border border-border">
            <StarRow count={5} />
            <span className="text-sm font-medium text-foreground">5.0</span>
            <span className="text-xs text-muted-foreground">· +200 reseñas verificadas</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`relative bg-card p-10 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Large decorative quote mark */}
              <span className="absolute top-6 right-8 font-serif text-7xl leading-none text-primary/10 select-none">
                &ldquo;
              </span>

              {/* Rating */}
              <StarRow count={testimonial.rating} />

              {/* Content */}
              <p className="text-foreground/75 leading-relaxed my-6 text-[0.9rem] italic relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                {/* Avatar initials */}
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-sm text-primary font-medium">
                    {testimonial.initial}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{testimonial.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google reviews nudge */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-xs text-muted-foreground tracking-wide">
            Valoraciones reales de Google · Instagram · Treatwell
          </p>
        </div>
      </div>
    </section>
  )
}
