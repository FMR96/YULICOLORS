"use client"

import Image from "next/image"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import { Instagram } from "lucide-react"

const instagramPosts = [
  { image: "/images/instagram-1.jpg", alt: "Tratamiento en YULI COLORS" },
  { image: "/images/instagram-2.jpg", alt: "Micropigmentación artística" },
  { image: "/images/instagram-3.jpg", alt: "Resultado de ritual facial" },
  { image: "/images/instagram-4.jpg", alt: "Interior del centro YULI COLORS" },
]

const IG_HANDLE = "@yuli_colors"
const IG_URL = "https://www.instagram.com/yuli_colors/"

export function InstagramSection() {
  const { ref, isInView } = useInView({ threshold: 0.08 })

  return (
    <section className="py-28 lg:py-40 bg-background">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className={`text-center max-w-xl mx-auto mb-14 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
              Instagram
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-foreground mb-4 text-balance leading-[1.15]">
            Síguenos en Instagram
          </h2>
          <Link
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group"
          >
            <Instagram className="w-4 h-4" />
            <span className="link-underline">{IG_HANDLE}</span>
          </Link>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {instagramPosts.map((post, index) => (
            <Link
              key={post.image}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square overflow-hidden transition-all duration-700 ${
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/35 transition-all duration-300 flex items-center justify-center">
                <Instagram className="w-7 h-7 text-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>

        {/* Follow CTA */}
        <div
          className={`text-center mt-10 transition-all duration-1000 delay-400 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-border text-foreground/60 hover:border-primary hover:text-primary px-8 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          >
            <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />
            Ver más en Instagram
          </Link>
        </div>
      </div>
    </section>
  )
}
