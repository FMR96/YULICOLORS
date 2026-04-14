"use client"

import { useInView } from "@/hooks/use-in-view"
import { Leaf, Users, Cpu, Crown } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Resultados Naturales",
    description:
      "Nuestras técnicas realzan tu belleza preservando tu esencia. Nada artificial, nada excesivo — solo la mejor versión de ti.",
  },
  {
    icon: Users,
    title: "Atención Profundamente Personalizada",
    description:
      "Cada clienta merece un protocolo único. Escuchamos, analizamos y diseñamos un tratamiento exclusivo para tus objetivos.",
  },
  {
    icon: Cpu,
    title: "Tecnología de Última Generación",
    description:
      "Equipamiento de vanguardia europeo. Herramientas que garantizan precisión, seguridad y resultados que sorprenden.",
  },
  {
    icon: Crown,
    title: "Ambiente de Exclusividad",
    description:
      "Un espacio diseñado con cuidado estético donde cada detalle invita a relajarte, confiar y dejarte cuidar.",
  },
]

export function FeaturesSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section className="py-28 lg:py-40 bg-foreground text-card">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left — headline block */}
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
                Por qué YULI COLORS
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-[1.15] mb-6 text-balance">
              Más que un centro estético — una experiencia que transforma
            </h2>
            <p className="text-card/60 leading-relaxed text-[0.95rem] mb-10 max-w-md">
              Somos tu aliada en el camino hacia tu mejor versión. Cada visita
              combina rigor técnico, sensibilidad artística y un trato que solo
              encontrarás aquí.
            </p>

            {/* Micro trust signals */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {["Valoraciones 5 estrellas", "Más de 10 años de experiencia", "Productos certificados"].map(
                (trust) => (
                  <div key={trust} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs text-card/50 tracking-wide">{trust}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right — features grid */}
          <div className="grid sm:grid-cols-2 gap-px bg-card/10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-8 bg-foreground hover:bg-card/5 transition-all duration-500 group ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="w-10 h-10 flex items-center justify-center border border-card/15 group-hover:border-primary/40 transition-colors duration-300 mb-5">
                  <feature.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-base text-card mb-3 leading-snug font-light">
                  {feature.title}
                </h3>
                <p className="text-card/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
