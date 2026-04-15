'use client'

import { useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { useAdmin } from '@/lib/admin-store'
import { STATUS_LABELS, STATUS_COLORS, formatDuration } from '@/lib/booking-data'
import { BookingModal } from '@/components/admin/booking-modal'
import type { Booking, BookingStatus } from '@/lib/booking-types'
import { Search, Filter, CheckCircle2, XCircle, Eye, CalendarDays } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const STATUS_FILTERS: { value: BookingStatus | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'confirmada', label: 'Confirmada' },
  { value: 'completada', label: 'Completada' },
  { value: 'cancelada', label: 'Cancelada' },
]

export default function ReservasAdminPage() {
  const { state, updateStatus } = useAdmin()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'todas'>('todas')
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)

  const filtered = useMemo(() => {
    return state.bookings
      .filter((b) => {
        const matchesSearch =
          !search ||
          b.clientName.toLowerCase().includes(search.toLowerCase()) ||
          b.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
          b.clientPhone.includes(search) ||
          b.serviceName.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === 'todas' || b.status === statusFilter
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        // Sort by date desc, then time asc
        if (a.date !== b.date) return b.date.localeCompare(a.date)
        return a.time.localeCompare(b.time)
      })
  }, [state.bookings, search, statusFilter])

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Reservas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} cita{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email, servicio…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 bg-card border-border rounded-xl text-sm"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                'text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150',
                statusFilter === f.value
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground text-sm space-y-2">
            <Filter className="w-8 h-8 mx-auto opacity-30" />
            <p>No se encontraron reservas con ese filtro</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Fecha & Hora
                    </th>
                    <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Clienta
                    </th>
                    <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Servicio
                    </th>
                    <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Estado
                    </th>
                    <th className="text-right px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-muted/20 transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-foreground text-xs">
                          {format(parseISO(booking.date + 'T00:00:00'), "dd MMM yyyy", { locale: es })}
                        </p>
                        <p className="text-muted-foreground text-xs">{booking.time}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-foreground text-xs">{booking.clientName}</p>
                        <p className="text-muted-foreground text-xs">{booking.clientEmail}</p>
                        <p className="text-muted-foreground text-xs">{booking.clientPhone}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-foreground text-xs">{booking.serviceName}</p>
                        <p className="text-muted-foreground text-xs">
                          {formatDuration(booking.serviceDuration)}
                          {booking.servicePrice && ` · ${booking.servicePrice}€`}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingBooking(booking)}
                            title="Ver / Editar"
                            className="w-7 h-7 rounded-full hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {booking.status !== 'completada' && booking.status !== 'cancelada' && (
                            <>
                              <button
                                onClick={() => updateStatus(booking.id, 'completada')}
                                title="Marcar como completada"
                                className="w-7 h-7 rounded-full hover:bg-emerald-50 flex items-center justify-center text-muted-foreground hover:text-emerald-600 transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => updateStatus(booking.id, 'cancelada')}
                                title="Cancelar"
                                className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border">
              {filtered.map((booking) => (
                <div key={booking.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {booking.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {format(parseISO(booking.date + 'T00:00:00'), 'dd MMM', { locale: es })}
                    </span>
                    <span>{booking.time}</span>
                    <span>{formatDuration(booking.serviceDuration)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingBooking(booking)}
                      className="text-[10px] font-bold uppercase tracking-wide text-primary border border-primary/30 rounded-full px-2.5 py-1 hover:bg-primary/5"
                    >
                      Editar
                    </button>
                    {booking.status !== 'completada' && booking.status !== 'cancelada' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'completada')}
                          className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 border border-emerald-200 rounded-full px-2.5 py-1 hover:bg-emerald-50"
                        >
                          Completar
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, 'cancelada')}
                          className="text-[10px] font-bold uppercase tracking-wide text-red-500 border border-red-100 rounded-full px-2.5 py-1 hover:bg-red-50"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit modal */}
      {editingBooking && (
        <BookingModal
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
        />
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: Booking['status'] }) {
  const { bg, text, dot } = STATUS_COLORS[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1', bg, text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', dot)} />
      {STATUS_LABELS[status]}
    </span>
  )
}
