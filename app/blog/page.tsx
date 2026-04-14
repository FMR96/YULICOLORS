import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getAllPosts, formatDate } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog de Estética | Consejos de Belleza en Camas, Sevilla | YULI COLORS",
  description:
    "Blog de estética premium en Camas, Sevilla. Consejos de belleza, guías de tratamientos, micropigmentación, depilación láser, lifting de pestañas y mucho más.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-background pt-24">

      {/* Hero header */}
      <section className="py-20 lg:py-28 bg-muted border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
                Blog & Consejos
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-5 leading-[1.1]">
              Belleza, cuidado<br />
              <span className="italic">y tendencias</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-[0.95rem] max-w-lg">
              Guías, consejos y novedades sobre estética avanzada escritas por nuestras
              especialistas en Camas, Sevilla.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className={`group flex flex-col ${
                  index === 0
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
                }`}
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden mb-5">
                  <div
                    className={`relative overflow-hidden ${
                      index === 0 ? "aspect-[16/7]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] tracking-[0.25em] uppercase px-3 py-1.5">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] text-muted-foreground tracking-wide">
                    {formatDate(post.date)}
                  </span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-[11px] text-muted-foreground tracking-wide">
                    {post.readTime} min de lectura
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`}>
                  <h2
                    className={`font-serif font-light text-foreground hover:text-primary transition-colors duration-300 leading-snug mb-3 ${
                      index === 0
                        ? "text-2xl md:text-3xl"
                        : "text-xl"
                    }`}
                  >
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-foreground/50 hover:text-primary transition-colors duration-300 group/link self-start"
                >
                  Leer artículo
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 bg-secondary/40 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-serif text-2xl md:text-3xl text-foreground font-light mb-4">
            ¿Lista para tu próximo tratamiento?
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Reserva tu cita en YULI COLORS, el centro de estética de referencia en Camas, Sevilla.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Reservar Cita
            </Link>
            <Link
              href="https://wa.me/34912345678?text=Hola,%20me%20gustaría%20reservar%20una%20cita%20en%20YULI%20COLORS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white hover:bg-[#1fb85a] px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
