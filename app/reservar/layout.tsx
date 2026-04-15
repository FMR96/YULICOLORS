import { BookingProvider } from '@/lib/booking-store'
import Link from 'next/link'

export default function ReservarLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-serif text-xl tracking-widest text-foreground hover:text-primary transition-colors"
            >
              YULI COLORS
            </Link>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Reserva tu cita
            </span>
          </div>
        </header>

        {/* Content */}
        <main>{children}</main>

        {/* Minimal footer */}
        <footer className="border-t border-border/30 py-6 mt-16">
          <p className="text-center text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} Yuli Colors · Centro de Estética Premium
          </p>
        </footer>
      </div>
    </BookingProvider>
  )
}
