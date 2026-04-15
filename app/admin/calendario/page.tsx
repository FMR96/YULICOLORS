'use client'

import { useMemo, useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  getDay,
  parseISO,
  addDays,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useAdmin } from '@/lib/admin-store'
import { STATUS_COLORS, STATUS_LABELS, formatDuration, isDateFullyBlocked } from '@/lib/booking-data'
import { BookingModal } from '@/components/admin/booking-modal'
import { BlockModal } from '@/components/admin/block-modal'
import type { Booking } from '@/lib/booking-types'
import { ChevronLeft, ChevronRight, Plus, Ban, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const DOW_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export default function CalendarioAdminPage() {
  const { state, updateStatus, removeBlockedSlot } = useAdmin()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [showBlockModal, setShowBlockModal] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad start so the calendar starts on Monday
  const firstDow = (getDay(monthStart) + 6) % 7 // Mon=0, Sun=6
  const leadingPad = Array.from({ length: firstDow })

  const bookingsByDate = useMemo(() => {
    const map: Record<string, Booking[]> = {}
    state.bookings.forEach((b) => {
      if (!map[b.date]) map[b.date] = []
      map[b.date].push(b)
    })
    return map
  }, [state.bookings])

  const selectedBookings = selectedDate ? (bookingsByDate[selectedDate] ?? []) : []
  const selectedBlocks = selectedDate
    ? state.blockedSlots.filter((s) => s.date === selectedDate)
    : []

  const isFullyBlockedFn = (dateStr: string) =>
    isDateFullyBlocked(dateStr, state.blockedSlots)

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Calendario</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Vista mensual de todas las citas
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBlockModal(true)}
            className="flex items-center gap-1.5 bg-secondary text-foreground px-4 py-2 rounded-full text-xs font-semibold border border-border hover:border-foreground/40 transition-all"
          >
            <Ban className="w-3.5 h-3.5" />
            Bloquear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="xl:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          {/* Month navigation */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <button
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-serif text-lg capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </h2>
            <button
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {DOW_LABELS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {/* Leading empty cells */}
            {leadingPad.map((_, i) => (
              <div key={`pad-${i}`} className="aspect-square border-b border-r border-border/30 bg-muted/20" />
            ))}

            {days.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd')
              const dayBookings = bookingsByDate[dateStr] ?? []
              const blocked = isFullyBlockedFn(dateStr)
              const isSelected = selectedDate === dateStr
              const today = isToday(day)

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={cn(
                    'aspect-square border-b border-r border-border/30 p-1 text-left transition-all duration-150 flex flex-col',
                    isSelected
                      ? 'bg-primary/8 border-primary/30'
                      : blocked
                      ? 'bg-red-50/50'
                      : 'hover:bg-muted/40',
                    !isSameMonth(day, currentMonth) && 'opacity-40'
                  )}
                >
                  <span
                    className={cn(
                      'text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center',
                      today
                        ? 'bg-primary text-primary-foreground'
                        : isSelected
                        ? 'text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {format(day, 'd')}
                  </span>

                  {/* Booking dots */}
                  <div className="flex flex-wrap gap-0.5 mt-auto px-0.5">
                    {dayBookings.slice(0, 3).map((b, i) => (
                      <span
                        key={i}
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          STATUS_COLORS[b.status].dot
                        )}
                      />
                    ))}
                    {dayBookings.length > 3 && (
                      <span className="text-[8px] text-muted-foreground font-bold">
                        +{dayBookings.length - 3}
                      </span>
                    )}
                  </div>

                  {blocked && (
                    <span className="text-[8px] text-red-400 font-bold leading-tight">
                      Bloq.
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 px-5 py-3 border-t border-border">
            {Object.entries(STATUS_COLORS).map(([status, { dot, text }]) => (
              <div key={status} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className={cn('w-2 h-2 rounded-full', dot)} />
                {STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-2 h-2 rounded-sm bg-red-200" />
              Bloqueado
            </div>
          </div>
        </div>

        {/* Day detail panel */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-muted-foreground text-sm gap-3 px-6 text-center">
              <CalendarIcon />
              <p>Selecciona un día en el calendario para ver los detalles</p>
            </div>
          ) : (
            <>
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-sm capitalize">
                  {format(parseISO(selectedDate + 'T00:00:00'), "EEEE d 'de' MMMM", { locale: es })}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[500px]">
                {/* Blocks */}
                {selectedBlocks.length > 0 && (
                  <div className="px-5 py-3 border-b border-border space-y-2">
                    {selectedBlocks.map((bl) => (
                      <div
                        key={bl.id}
                        className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-3 py-2"
                      >
                        <div>
                          <p className="text-xs font-semibold text-red-600">
                            {bl.time ? `${bl.time} — Bloqueado` : 'Día completo bloqueado'}
                          </p>
                          {bl.reason && (
                            <p className="text-[10px] text-red-400">{bl.reason}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeBlockedSlot(bl.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bookings */}
                {selectedBookings.length === 0 && selectedBlocks.length === 0 ? (
                  <div className="px-5 py-8 text-center text-muted-foreground text-sm">
                    Sin citas ni bloqueos para este día
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {selectedBookings
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="px-5 py-3 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-foreground">
                                {booking.time}
                              </p>
                              <p className="text-xs font-semibold text-foreground mt-0.5">
                                {booking.clientName}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {booking.serviceName} · {formatDuration(booking.serviceDuration)}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <StatusBadge status={booking.status} />
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-1.5 mt-2">
                            <button
                              onClick={() => setEditingBooking(booking)}
                              className="text-[9px] font-bold uppercase tracking-wide text-primary border border-primary/30 rounded-full px-2 py-0.5 hover:bg-primary/5"
                            >
                              Editar
                            </button>
                            {booking.status !== 'completada' && booking.status !== 'cancelada' && (
                              <>
                                <button
                                  onClick={() => updateStatus(booking.id, 'completada')}
                                  className="text-[9px] font-bold uppercase tracking-wide text-emerald-600 border border-emerald-200 rounded-full px-2 py-0.5 hover:bg-emerald-50"
                                >
                                  Completar
                                </button>
                                <button
                                  onClick={() => updateStatus(booking.id, 'cancelada')}
                                  className="text-[9px] font-bold uppercase tracking-wide text-red-500 border border-red-100 rounded-full px-2 py-0.5 hover:bg-red-50"
                                >
                                  Cancelar
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Add to this day */}
              <div className="border-t border-border px-5 py-3 flex gap-2">
                <button
                  onClick={() => setShowBlockModal(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground border border-border rounded-xl py-2.5 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Ban className="w-3 h-3" />
                  Bloquear
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {editingBooking && (
        <BookingModal
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
        />
      )}
      {showBlockModal && (
        <BlockModal
          defaultDate={selectedDate ?? undefined}
          onClose={() => setShowBlockModal(false)}
        />
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: Booking['status'] }) {
  const { bg, text } = STATUS_COLORS[status]
  return (
    <span className={cn('text-[9px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5', bg, text)}>
      {STATUS_LABELS[status]}
    </span>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-10 h-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
