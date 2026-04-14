import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getAllPosts, getPostBySlug, getLatestPosts, formatDate } from "@/lib/blog"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
    },
  }
}

const WA_LINK =
  "https://wa.me/34912345678?text=Hola,%20me%20gustaría%20reservar%20una%20cita%20en%20YULI%20COLORS"

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getLatestPosts(4).filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-background pt-20">

      {/* Hero image */}
      <div className="relative aspect-[16/6] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
        {/* Category + reading time */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-primary text-primary-foreground text-[10px] tracking-[0.3em] uppercase px-3 py-1.5">
                {post.category}
              </span>
              <span className="text-card/70 text-xs tracking-wide">
                {post.readTime} min de lectura
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-card leading-[1.1] max-w-3xl text-balance">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-16">

          {/* Main content */}
          <article className="lg:col-span-2">
            {/* Meta row */}
            <div className="flex items-center gap-4 pb-8 mb-10 border-b border-border">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-serif text-sm text-primary font-medium">Y</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(post.date)}</p>
              </div>
            </div>

            {/* Content blocks */}
            <div className="prose-custom">
              {post.content.map((block, i) => {
                if (block.type === "p") {
                  return (
                    <p
                      key={i}
                      className="text-foreground/80 leading-[1.85] mb-6 text-[0.95rem]"
                    >
                      {block.text}
                    </p>
                  )
                }
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      className="font-serif text-2xl md:text-3xl font-light text-foreground mt-12 mb-5 leading-snug"
                    >
                      {block.text}
                    </h2>
                  )
                }
                if (block.type === "h3") {
                  return (
                    <h3
                      key={i}
                      className="font-serif text-xl font-light text-foreground mt-8 mb-4 leading-snug"
                    >
                      {block.text}
                    </h3>
                  )
                }
                if (block.type === "ul") {
                  return (
                    <ul key={i} className="space-y-3 mb-6 mt-2">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-foreground/80 text-[0.95rem] leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (block.type === "ol") {
                  return (
                    <ol key={i} className="space-y-3 mb-6 mt-2">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-foreground/80 text-[0.95rem] leading-relaxed"
                        >
                          <span className="font-serif text-primary font-light text-sm flex-shrink-0 w-5 mt-0.5">
                            {j + 1}.
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  )
                }
                if (block.type === "cta") {
                  return (
                    <div
                      key={i}
                      className="my-10 p-8 bg-secondary/50 border border-border"
                    >
                      <p className="font-serif text-xl text-foreground font-light mb-2">
                        ¿Lista para dar el primer paso?
                      </p>
                      <p className="text-muted-foreground text-sm mb-6">
                        Reserva tu consulta gratuita en YULI COLORS, Camas, Sevilla.
                        Sin compromiso, con toda la información que necesitas.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href="/#contacto"
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg"
                        >
                          Reservar Cita
                        </Link>
                        <Link
                          href={WA_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1fb85a] px-7 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          WhatsApp
                        </Link>
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </div>

            {/* Back to blog */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                ← Volver al blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">

              {/* Book CTA card */}
              <div className="bg-foreground text-card p-8">
                <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-light">
                  YULI COLORS · Camas
                </p>
                <p className="font-serif text-xl font-light text-card mb-3 leading-snug">
                  ¿Quieres saber más sobre este tratamiento?
                </p>
                <p className="text-card/55 text-sm leading-relaxed mb-6">
                  Nuestras especialistas en Camas, Sevilla, te asesoran sin coste ni compromiso.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/#contacto"
                    className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg"
                  >
                    Reservar Cita
                  </Link>
                  <Link
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 px-6 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </Link>
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5 font-light">
                    Artículos relacionados
                  </p>
                  <div className="space-y-5">
                    {related.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className="flex gap-4 group"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                          <Image
                            src={rel.image}
                            alt={rel.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] tracking-wide uppercase text-primary/70 mb-1">
                            {rel.category}
                          </p>
                          <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors duration-300 leading-snug font-serif font-light line-clamp-2">
                            {rel.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
