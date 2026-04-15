'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, isBefore, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useAdmin } from '@/lib/admin-store'
import {
  SERVICES,
  formatDuration,
  generateTimeSlots,
  isDateFullyBlocked,
  isBusinessDay,
} from '@/lib/booking-data'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { Booking } from '@/lib/booking-types'
import {
  ChevronLeft,
  User,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Clock,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  serviceId: z.string().min(1),
  clientName: z.string().min(2).max(80),
  clientPhone: z.string().min(9).regex(/^[\d\s\+\-\(\)]{9,15}$/),
  clientEmail: z.string().email(),
  notes: z.string().max(300).optional(),
  internalNotes: z.string().max(300).optional(),
})

type FormData = z.infer<typeof schema>

export default function NuevaReservaAdminPage() {
  const router = useRouter()
  const { state: adminState, addBooking } = useAdmin()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { serviceId: SERVICES[0].id },
  })

  const serviceId = watch('serviceId')
  const service = SERVICES.find((s) => s.id === serviceId)

  const today = startOfDay(new Date())
  const dateStr = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : null

  const timeSlots =
    dateStr && service
      ? generateTimeSlots(dateStr, service.duration, adminState.bookings, adminState.blockedSlots)
      : []

  const availableSlots = timeSlots.filter((s) => s.available)

  const disabledDays = (date: Date) => {
    if (isBefore(date, today)) return true
    if (!isBusinessDay(date)) return true
    const str = format(date, 'yyyy-MM-dd')
    return isDateFullyBlocked(str, adminState.blockedSlots)
  }

  const onSubmit = (data: FormData) => {
    if (!dateStr || !selectedTime || !service) return

    const booking: Booking = {
      id: `bk-${Date.now()}`,
      serviceId: data.serviceId,
      serviceName: service.name,
      serviceDuration: service.duration,
      servicePrice: service.price,
      date: dateStr,
      time: selectedTime,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail,
      notes: data.notes || undefined,
      internalNotes: data.internalNotes || undefined,
      status: 'confirmada',
      createdAt: new Date().toISOString(),
    }

    addBooking(booking)
    router.push('/admin')
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/admin')}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Nueva reserva</h1>
          <p className="text-sm text-muted-foreground">Crea una cita manualmente desde el panel</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left col: service + calendar + time */}
          <div className="space-y-5">
            {/* Service selector */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <h2 className="font-semibold text-sm">Servicio</h2>
              <select
                {...register('serviceId')}
                className="w-full text-sm bg-background border border-border rounded-xl px-3 py-3 focus:border-primary focus:outline-none"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {formatDuration(s.duration)}
                    {s.price ? ` · ${s.price}€` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Calendar */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold text-sm mb-3">Fecha</h2>
              <Calendar
                mode="single"
                selected={selectedDay}
                onSelect={(d) => { setSelectedDay(d); setSelectedTime('') }}
                disabled={disabledDays}
                locale={es}
                className="w-full"
              />
            </div>

            {/* Time slots */}
            {selectedDay && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <h2 className="font-semibold text-sm mb-3">
                  Hora disponible
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({availableSlots.length} huecos)
                  </span>
                </h2>
                {availableSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Sin horarios disponibles para este día
                  </p>
                ) : (
                  <div className="grid grid-cols-4 gap-1.5">
                    {timeSlots.map(({ time, available }) => (
                      <button
                        key={time}
                        type="button"
                        disabled={!available}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          'py-2 text-xs font-medium rounded-lg border transition-all',
                          available
                            ? selectedTime === time
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background border-border hover:border-primary hover:text-primary'
                            : 'bg-muted/50 border-border/30 text-muted-foreground/40 cursor-not-allowed line-through'
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right col: client data */}
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <h2 className="font-semibold text-sm">Datos de la clienta</h2>

              {/* Name */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Nombre completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register('clientName')}
                    placeholder="Nombre y apellidos"
                    className={cn(
                      'pl-10 h-11 bg-background border-border rounded-xl',
                      errors.clientName && 'border-destructive'
                    )}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Teléfono *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register('clientPhone')}
                    type="tel"
                    placeholder="600 000 000"
                    className={cn(
                      'pl-10 h-11 bg-background border-border rounded-xl',
                      errors.clientPhone && 'border-destructive'
                    )}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register('clientEmail')}
                    type="email"
                    placeholder="email@ejemplo.com"
                    className={cn(
                      'pl-10 h-11 bg-background border-border rounded-xl',
                      errors.clientEmail && 'border-destructive'
                    )}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Notas de la clienta
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    {...register('notes')}
                    rows={2}
                    placeholder="Alergias, preferencias…"
                    className="pl-10 bg-background border-border rounded-xl resize-none text-sm"
                  />
                </div>
              </div>

              {/* Internal notes */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wide text-amber-600">
                  Notas internas (solo admin)
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    {...register('internalNotes')}
                    rows={2}
                    placeholder="Notas privadas del equipo…"
                    className="pl-10 bg-background border-border rounded-xl resize-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            {service && dateStr && selectedTime && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
                  Resumen de la cita
                </p>
                <p className="text-sm font-semibold text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {format(new Date(dateStr + 'T00:00:00'), "EEEE d MMM", { locale: es })} · {selectedTime}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDuration(service.duration)}
                  {service.price ? ` · ${service.price}€` : ''}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || !dateStr || !selectedTime}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all duration-300',
                isValid && dateStr && selectedTime
                  ? 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:scale-[1.01]'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              <Check className="w-4 h-4" />
              Crear reserva
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
