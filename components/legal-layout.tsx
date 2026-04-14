import Link from "next/link"

interface LegalLayoutProps {
  badge: string
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ badge, title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-background pt-20">

      {/* Header */}
      <div className="py-16 lg:py-20 bg-muted border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-primary" />
            <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
              {badge}
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm">
            Última actualización:{" "}
            <time dateTime={lastUpdated}>
              {new Date(lastUpdated).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20 max-w-4xl">
        {children}

        {/* Back nav */}
        <div className="mt-16 pt-10 border-t border-border flex flex-wrap gap-6">
          <Link
            href="/"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            ← Volver al inicio
          </Link>
          <Link
            href="/privacidad"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Política de Privacidad
          </Link>
          <Link
            href="/cookies"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Política de Cookies
          </Link>
          <Link
            href="/aviso-legal"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Aviso Legal
          </Link>
        </div>
      </div>
    </main>
  )
}

/* ─── Reusable block components ─────────────────────────────────── */

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-5 pb-4 border-b border-border leading-snug">
        {title}
      </h2>
      <div className="space-y-4 text-foreground/75 leading-[1.8] text-[0.9375rem]">
        {children}
      </div>
    </section>
  )
}

export function LegalSubsection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-6">
      <h3 className="font-serif text-lg font-light text-foreground mb-3 leading-snug">
        {title}
      </h3>
      <div className="space-y-3 text-foreground/70 leading-[1.8] text-[0.9375rem]">
        {children}
      </div>
    </div>
  )
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-foreground/70">
          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto mt-4 -mx-2">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-border">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium py-3 px-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border/50 ${
                i % 2 === 0 ? "bg-transparent" : "bg-muted/40"
              }`}
            >
              {row.map((cell, j) => (
                <td key={j} className="py-3 px-4 text-foreground/70 align-top leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary/50 border border-border p-5 my-4">
      <div className="flex items-start gap-3">
        <div className="w-1 h-full min-h-[1.25rem] bg-primary flex-shrink-0 mt-1" />
        <div className="text-foreground/75 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
