'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle, Calendar, ArrowRight, Sparkles } from 'lucide-react'

export default function ExitoPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div
        className={`
          max-w-md w-full text-center space-y-8 transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        {/* Animated checkmark */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold">
            ¡Cita solicitada!
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-snug">
            Tu cita está pendiente de confirmación
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Hemos recibido tu solicitud. Recibirás una confirmación por correo electrónico
            en breve con todos los detalles de tu cita.
          </p>
        </div>

        {/* Info box */}
        <div className="bg-secondary/40 border border-border/50 rounded-2xl p-5 text-left space-y-3">
          <h3 className="font-serif text-base text-foreground">¿Qué pasa ahora?</h3>
          <ul className="space-y-2.5">
            {[
              'Te contactaremos al 622 886 878 para confirmar tu cita',
              'Recibirás un recordatorio el día anterior',
              'Escríbenos por WhatsApp al 622 886 878 si necesitas modificarla',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground/50">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs tracking-widest uppercase">Yuli Colors · Centro de Estética Premium</span>
          <Sparkles className="w-3 h-3" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="https://wa.me/34622886878?text=Hola,%20acabo%20de%20hacer%20una%20reserva%20en%20YULI%20COLORS%20y%20quería%20confirmarla"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#1fb85a] transition-all duration-300 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Confirmar por WhatsApp
          </Link>
          <Link
            href="/reservar"
            className="flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            Nueva reserva
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-6 py-3 hover:text-foreground hover:border-foreground/50 transition-colors"
          >
            Ir a inicio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
