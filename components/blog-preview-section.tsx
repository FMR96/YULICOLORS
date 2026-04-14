import Image from "next/image"
import Link from "next/link"
import { getLatestPosts, formatDate } from "@/lib/blog"

export function BlogPreviewSection() {
  const posts = getLatestPosts(3)

  return (
    <section className="py-28 lg:py-40 bg-muted">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
                Blog & Consejos
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-foreground leading-[1.15] text-balance max-w-lg">
              Consejos de belleza para Camas y alrededores
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex-shrink-0 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-foreground/50 hover:text-primary transition-colors duration-300 group"
          >
            Ver todos los artículos
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className={`group flex flex-col ${index === 0 ? "md:col-span-1" : ""}`}
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden mb-5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] tracking-[0.25em] uppercase px-3 py-1.5">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Meta */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] text-muted-foreground">{formatDate(post.date)}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-[11px] text-muted-foreground">{post.readTime} min</span>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-serif text-xl font-light text-foreground hover:text-primary transition-colors duration-300 leading-snug mb-3">
                  {post.title}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                {post.excerpt}
              </p>

              {/* CTA */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-foreground/45 hover:text-primary transition-colors duration-300 group/link self-start"
              >
                Leer artículo
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
