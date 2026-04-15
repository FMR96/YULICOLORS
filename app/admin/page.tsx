'use client'

import { useMemo, useState } from 'react'
import { format, isToday, parseISO, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'
import { useAdmin } from '@/lib/admin-store'
import { STATUS_LABELS, STATUS_COLORS, formatDuration } from '@/lib/booking-data'
import { BookingModal } from '@/components/admin/booking-modal'
import { BlockModal } from '@/components/admin/block-modal'
import type { Booking } from '@/lib/booking-types'
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Plus,
  Ban,
  ChevronRight,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminDashboardPage() {
  const { state, updateStatus } = useAdmin()
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [showBlockModal, setShowBlockModal] = useState(false)

  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const todayBookings = useMemo(
    () =>
      state.bookings
        .filter((b) => b.date === todayStr && b.status !== 'cancelada')
        .sort((a, b) => a.time.localeCompare(b.time)),
    [state.bookings, todayStr]
  )

  const upcomingBookings = useMemo(
    () =>
      state.bookings
        .filter(
          (b) =>
            b.date > todayStr &&
            b.date <= format(addDays(new Date(), 7), 'yyyy-MM-dd') &&
            b.status !== 'cancelada'
        )
        .sort((a, b) => a.date.localeCompare(a.date) || a.time.localeCompare(b.time))
        .slice(0, 6),
    [state.bookings, todayStr]
  )

  const stats = useMemo(() => {
    const pending = state.bookings.filter((b) => b.status === 'pendiente').length
    const confirmed = state.bookings.filter((b) => b.status === 'confirmada').length
    const completed = state.bookings.filter((b) => b.status === 'completada').length
    const cancelled = state.bookings.filter((b) => b.status === 'cancelada').length
    return { pending, confirmed, completed, cancelled, total: state.bookings.length }
  }, [state.bookings])

  const blockedToday = state.blockedSlots.filter(
    (b) => b.date === todayStr && !b.time
  ).length > 0

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            {format(new Date(), "EEEE d 'de' MMMM yyyy", { locale: es })}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground mt-1">
            Buenos días, Yuli
          </h1>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2">
          <Link
            href="/admin/nueva"
            className="flex items-center gap-1.5 bg-foreground text-background px-4 py-2 rounded-full text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
            Nueva cita
          </Link>
          <button
            onClick={() => setShowBlockModal(true)}
            className="flex items-center gap-1.5 bg-secondary text-foreground px-4 py-2 rounded-full text-xs font-semibold border border-border hover:border-foreground/40 transition-all duration-200"
          >
            <Ban className="w-3.5 h-3.5" />
            Bloquear agenda
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Pendientes"
          value={stats.pending}
          icon={<AlertCircle className="w-5 h-5" />}
          color="text-amber-600"
          bg="bg-amber-50"
        />
        <KpiCard
          label="Confirmadas"
          value={stats.confirmed}
          icon={<CalendarDays className="w-5 h-5" />}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <KpiCard
          label="Completadas"
          value={stats.completed}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <KpiCard
          label="Canceladas"
          value={stats.cancelled}
          icon={<XCircle className="w-5 h-5" />}
          color="text-red-500"
          bg="bg-red-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's agenda */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-sm text-foreground">Agenda de hoy</h2>
              {todayBookings.length > 0 && (
                <span className="text-xs bg-primary/15 text-primary font-semibold px-2 py-0.5 rounded-full">
                  {todayBookings.length}
                </span>
              )}
            </div>
            {blockedToday && (
              <span className="text-[10px] font-semibold uppercase tracking-wide bg-red-50 text-red-500 px-2 py-1 rounded-full border border-red-100">
                Día bloqueado
              </span>
            )}
          </div>

          <div className="divide-y divide-border">
            {todayBookings.length === 0 ? (
              <div className="px-5 py-10 text-center text-muted-foreground text-sm">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                No hay citas para hoy
              </div>
            ) : (
              todayBookings.map((booking) => (
                <AgendaItem
                  key={booking.id}
                  booking={booking}
                  onEdit={() => setEditingBooking(booking)}
                  onComplete={() => updateStatus(booking.id, 'completada')}
                  onCancel={() => updateStatus(booking.id, 'cancelada')}
                />
              ))
            )}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-sm text-foreground">Próximas citas</h2>
            </div>
            <Link
              href="/admin/reservas"
              className="text-[10px] font-semibold uppercase tracking-wide text-primary hover:underline"
            >
              Ver todas
            </Link>
          </div>

          <div className="divide-y divide-border">
            {upcomingBookings.length === 0 ? (
              <div className="px-5 py-10 text-center text-muted-foreground text-sm">
                No hay próximas citas
              </div>
            ) : (
              upcomingBookings.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => setEditingBooking(booking)}
                  className="w-full px-5 py-3.5 text-left hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {booking.clientName}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {booking.serviceName}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-medium text-foreground">
                        {format(parseISO(booking.date + 'T00:00:00'), 'dd MMM', { locale: es })}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{booking.time}</p>
                    </div>
                  </div>
                  <StatusBadge status={booking.status} />
                </button>
              ))
            )}
          </div>

          {upcomingBookings.length > 0 && (
            <div className="px-5 py-3 border-t border-border">
              <Link
                href="/admin/calendario"
                className="flex items-center justify-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Ver en calendario
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
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
        <BlockModal onClose={() => setShowBlockModal(false)} />
      )}
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  icon,
  color,
  bg,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  bg: string
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', bg)}>
        <span className={color}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  )
}

function AgendaItem({
  booking,
  onEdit,
  onComplete,
  onCancel,
}: {
  booking: Booking
  onEdit: () => void
  onComplete: () => void
  onCancel: () => void
}) {
  const colors = STATUS_COLORS[booking.status]

  return (
    <div className="px-5 py-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-start gap-4">
        {/* Time */}
        <div className="flex-shrink-0 text-center w-12">
          <p className="text-sm font-bold text-foreground">{booking.time}</p>
          <p className="text-[10px] text-muted-foreground">
            {formatDuration(booking.serviceDuration)}
          </p>
        </div>

        {/* Divider dot */}
        <div className="flex-shrink-0 flex flex-col items-center pt-1.5">
          <div className={cn('w-2 h-2 rounded-full', colors.dot)} />
          <div className="w-px flex-1 bg-border mt-1" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-foreground">{booking.clientName}</p>
              <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={onEdit}
              className="text-[10px] font-semibold uppercase tracking-wide text-primary border border-primary/30 rounded-full px-2.5 py-1 hover:bg-primary/5 transition-colors"
            >
              Editar
            </button>
            {booking.status !== 'completada' && booking.status !== 'cancelada' && (
              <>
                <button
                  onClick={onComplete}
                  className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 border border-emerald-200 rounded-full px-2.5 py-1 hover:bg-emerald-50 transition-colors"
                >
                  Completada
                </button>
                <button
                  onClick={onCancel}
                  className="text-[10px] font-semibold uppercase tracking-wide text-red-500 border border-red-100 rounded-full px-2.5 py-1 hover:bg-red-50 transition-colors"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Booking['status'] }) {
  const { bg, text } = STATUS_COLORS[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 mt-1.5',
        bg,
        text
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
