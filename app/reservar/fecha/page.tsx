'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, isBefore, startOfDay, isSunday } from 'date-fns'
import { es } from 'date-fns/locale'
import { useBooking } from '@/lib/booking-store'
import {
  getServiceById,
  generateTimeSlots,
  isDateFullyBlocked,
  isBusinessDay,
  MOCK_BLOCKED_SLOTS,
  MOCK_BOOKINGS,
  formatDuration,
} from '@/lib/booking-data'
import { BookingProgress } from '@/components/booking/booking-progress'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Clock, CalendarIcon } from 'lucide-react'

export default function FechaPage() {
  const router = useRouter()
  const { state, setDate, setTime } = useBooking()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    state.selectedDate ? new Date(state.selectedDate + 'T00:00:00') : undefined
  )
  const [adminBookings] = useState(MOCK_BOOKINGS)
  const [blockedSlots] = useState(MOCK_BLOCKED_SLOTS)

  // Load admin data from localStorage if available
  const [bookings, setBookings] = useState(MOCK_BOOKINGS)
  const [blocked, setBlocked] = useState(MOCK_BLOCKED_SLOTS)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('yuli_admin_data')
      if (stored) {
        const data = JSON.parse(stored)
        if (data.bookings) setBookings(data.bookings)
        if (data.blockedSlots) setBlocked(data.blockedSlots)
      }
    } catch (_) {}
  }, [])

  const service = state.selectedServiceId ? getServiceById(state.selectedServiceId) : null

  // Redirect if no service selected
  useEffect(() => {
    if (!state.selectedServiceId) {
      router.replace('/reservar')
    }
  }, [state.selectedServiceId, router])

  const today = startOfDay(new Date())

  const dateStr = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : null
  const timeSlots = dateStr && service
    ? generateTimeSlots(dateStr, service.duration, bookings, blocked)
    : []

  const availableSlots = timeSlots.filter((s) => s.available)
  const isFullyBlocked = dateStr ? isDateFullyBlocked(dateStr, blocked) : false

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day)
    if (day) setDate(format(day, 'yyyy-MM-dd'))
    setTime('')
  }

  const handleTimeSelect = (time: string) => {
    setTime(time)
    router.push('/reservar/datos')
  }

  const disabledDays = (date: Date) => {
    if (isBefore(date, today)) return true
    if (!isBusinessDay(date)) return true
    const str = format(date, 'yyyy-MM-dd')
    if (isDateFullyBlocked(str, blocked)) return true
    return false
  }

  if (!service) return null

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pb-24">
      {/* Progress */}
      <BookingProgress currentStep={2} />

      {/* Header */}
      <div className="mt-12 mb-10 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">
          Paso 2 de 4
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
          Elige tu fecha y hora
        </h1>

        {/* Selected service badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/60 border border-border/50 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium text-foreground">{service.name}</span>
          <span className="text-border">·</span>
          <span>{formatDuration(service.duration)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Calendar */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold tracking-wide">Selecciona un día</h2>
          </div>
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={handleDaySelect}
            disabled={disabledDays}
            locale={es}
            className="w-full"
            classNames={{
              months: 'flex flex-col w-full',
              month: 'w-full',
              caption: 'flex justify-between items-center mb-4',
              caption_label: 'font-serif text-base capitalize',
              nav: 'flex gap-1',
              nav_button: 'h-7 w-7 bg-transparent hover:bg-secondary rounded-full flex items-center justify-center transition-colors',
              table: 'w-full border-collapse',
              head_row: 'flex w-full mb-1',
              head_cell: 'flex-1 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground py-1',
              row: 'flex w-full mb-1',
              cell: 'flex-1 flex items-center justify-center',
              day: 'h-9 w-9 flex items-center justify-center rounded-full text-sm transition-all duration-200 hover:bg-secondary cursor-pointer font-medium',
              day_selected: 'bg-primary text-primary-foreground hover:bg-primary shadow-md',
              day_today: 'ring-1 ring-primary/40 font-bold',
              day_disabled: 'opacity-30 cursor-not-allowed hover:bg-transparent',
              day_outside: 'opacity-30',
            }}
          />
          <p className="text-[10px] text-muted-foreground mt-3 text-center">
            Lun–Vie 10:00–20:00 · Sáb 10:00–15:00 · Dom cerrado
          </p>
        </div>

        {/* Time slots */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold tracking-wide">Horario disponible</h2>
          </div>

          {!selectedDay ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm gap-2">
              <CalendarIcon className="w-8 h-8 opacity-30" />
              <p>Selecciona un día primero</p>
            </div>
          ) : isFullyBlocked ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm gap-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">🚫</div>
              <p className="font-medium text-foreground">Día no disponible</p>
              <p className="text-xs text-center">Este día está bloqueado. Por favor, elige otra fecha.</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm gap-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">😔</div>
              <p className="font-medium text-foreground">Sin huecos disponibles</p>
              <p className="text-xs text-center">No hay horarios libres para esta fecha. Prueba con otro día.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                {format(selectedDay, "EEEE d 'de' MMMM", { locale: es })} ·{' '}
                <span className="text-foreground font-medium">{availableSlots.length} huecos</span>
              </p>
              <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-64 pr-1">
                {timeSlots.map(({ time, available }) => (
                  <button
                    key={time}
                    disabled={!available}
                    onClick={() => available && handleTimeSelect(time)}
                    className={cn(
                      'py-2.5 px-2 rounded-xl text-sm font-medium border transition-all duration-200',
                      available
                        ? state.selectedTime === time
                          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                          : 'bg-background border-border hover:border-primary hover:bg-primary/5 hover:text-primary cursor-pointer'
                        : 'bg-muted/50 border-border/30 text-muted-foreground/40 cursor-not-allowed line-through'
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between max-w-3xl mx-auto mt-8">
        <button
          onClick={() => router.push('/reservar')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Cambiar servicio
        </button>

        {state.selectedDate && state.selectedTime && (
          <button
            onClick={() => router.push('/reservar/datos')}
            className="flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
