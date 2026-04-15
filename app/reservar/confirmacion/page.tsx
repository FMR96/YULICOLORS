'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useBooking } from '@/lib/booking-store'
import { getServiceById, formatDuration } from '@/lib/booking-data'
import { BookingProgress } from '@/components/booking/booking-progress'
import { ChevronLeft, Clock, CalendarIcon, User, Phone, Mail, MessageSquare, Check } from 'lucide-react'
import type { Booking } from '@/lib/booking-types'

function generateId() {
  return 'bk-' + Math.random().toString(36).slice(2, 10)
}

export default function ConfirmacionPage() {
  const router = useRouter()
  const { state, reset } = useBooking()
  const [loading, setLoading] = useState(false)

  const service = state.selectedServiceId ? getServiceById(state.selectedServiceId) : null

  useEffect(() => {
    if (!state.selectedServiceId || !state.selectedDate || !state.selectedTime || !state.clientName) {
      router.replace('/reservar')
    }
  }, [state, router])

  const formattedDate =
    state.selectedDate
      ? format(new Date(state.selectedDate + 'T00:00:00'), "EEEE d 'de' MMMM yyyy", { locale: es })
      : ''

  const handleConfirm = () => {
    if (!service || !state.selectedDate || !state.selectedTime) return

    setLoading(true)

    // Build the booking object
    const newBooking: Booking = {
      id: generateId(),
      serviceId: service.id,
      serviceName: service.name,
      serviceDuration: service.duration,
      servicePrice: service.price,
      date: state.selectedDate,
      time: state.selectedTime,
      clientName: state.clientName,
      clientPhone: state.clientPhone,
      clientEmail: state.clientEmail,
      notes: state.notes || undefined,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage (admin store)
    try {
      const stored = localStorage.getItem('yuli_admin_data')
      const adminData = stored ? JSON.parse(stored) : { bookings: [], blockedSlots: [] }
      adminData.bookings = [newBooking, ...adminData.bookings]
      localStorage.setItem('yuli_admin_data', JSON.stringify(adminData))
    } catch (_) {}

    // Simulate async save
    setTimeout(() => {
      reset()
      router.push('/reservar/exito')
    }, 1200)
  }

  if (!service) return null

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pb-24">
      <BookingProgress currentStep={4} />

      <div className="mt-12 mb-10 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">
          Paso 4 de 4
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
          Confirma tu cita
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Revisa todos los datos antes de confirmar. Puedes modificar cualquier detalle volviendo al paso anterior.
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {/* Summary card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-primary/5 border-b border-border/50 px-6 py-4">
            <p className="text-xs tracking-widest uppercase text-primary font-semibold mb-0.5">
              Resumen de tu reserva
            </p>
            <h2 className="font-serif text-xl text-foreground">{service.name}</h2>
          </div>

          {/* Details */}
          <div className="px-6 py-5 space-y-4">
            {/* Service details */}
            <div className="grid grid-cols-2 gap-3">
              <SummaryItem
                icon={<Clock className="w-4 h-4 text-primary" />}
                label="Duración"
                value={formatDuration(service.duration)}
              />
              {service.price !== null && (
                <SummaryItem
                  icon={<span className="text-primary font-bold text-sm">€</span>}
                  label={service.priceFrom ? 'Desde' : 'Precio'}
                  value={`${service.price}€`}
                />
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Date & time */}
            <SummaryItem
              icon={<CalendarIcon className="w-4 h-4 text-primary" />}
              label="Fecha"
              value={<span className="capitalize">{formattedDate}</span>}
            />
            <SummaryItem
              icon={<Clock className="w-4 h-4 text-primary" />}
              label="Hora"
              value={state.selectedTime ?? ''}
            />

            <div className="h-px bg-border" />

            {/* Client data */}
            <SummaryItem
              icon={<User className="w-4 h-4 text-primary" />}
              label="Nombre"
              value={state.clientName}
            />
            <SummaryItem
              icon={<Phone className="w-4 h-4 text-primary" />}
              label="Teléfono"
              value={state.clientPhone}
            />
            <SummaryItem
              icon={<Mail className="w-4 h-4 text-primary" />}
              label="Email"
              value={state.clientEmail}
            />
            {state.notes && (
              <SummaryItem
                icon={<MessageSquare className="w-4 h-4 text-primary" />}
                label="Notas"
                value={state.notes}
              />
            )}
          </div>
        </div>

        {/* Fine print */}
        <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
          Al confirmar, aceptas la política de cancelación. Las citas canceladas con menos de 24 horas de antelación
          pueden estar sujetas a cargo.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => router.push('/reservar/datos')}
            className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-full px-5 py-3 transition-colors hover:border-foreground/50"
          >
            <ChevronLeft className="w-4 h-4" />
            Modificar datos
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                Confirmando…
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Confirmar cita
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-sm text-foreground font-medium break-words">{value}</p>
      </div>
    </div>
  )
}
