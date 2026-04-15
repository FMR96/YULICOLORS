'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { useAdmin } from '@/lib/admin-store'
import {
  SERVICES,
  STATUS_LABELS,
  STATUS_COLORS,
  formatDuration,
  generateTimeSlots,
  isDateFullyBlocked,
} from '@/lib/booking-data'
import type { Booking, BookingStatus } from '@/lib/booking-types'
import {
  X,
  User,
  Phone,
  Mail,
  Clock,
  CalendarIcon,
  MessageSquare,
  FileText,
  ChevronDown,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface BookingModalProps {
  booking: Booking
  onClose: () => void
}

const STATUS_OPTIONS: BookingStatus[] = ['pendiente', 'confirmada', 'completada', 'cancelada']

export function BookingModal({ booking, onClose }: BookingModalProps) {
  const { updateBooking, deleteBooking } = useAdmin()
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  // Editable fields
  const [status, setStatus] = useState<BookingStatus>(booking.status)
  const [date, setDate] = useState(booking.date)
  const [time, setTime] = useState(booking.time)
  const [serviceId, setServiceId] = useState(booking.serviceId)
  const [clientName, setClientName] = useState(booking.clientName)
  const [clientPhone, setClientPhone] = useState(booking.clientPhone)
  const [clientEmail, setClientEmail] = useState(booking.clientEmail)
  const [notes, setNotes] = useState(booking.notes ?? '')
  const [internalNotes, setInternalNotes] = useState(booking.internalNotes ?? '')

  const selectedService = SERVICES.find((s) => s.id === serviceId)

  const formattedDate = date
    ? format(parseISO(date + 'T00:00:00'), "EEEE d 'de' MMMM yyyy", { locale: es })
    : ''

  const handleSave = () => {
    const service = SERVICES.find((s) => s.id === serviceId)
    updateBooking(booking.id, {
      status,
      date,
      time,
      serviceId,
      serviceName: service?.name ?? booking.serviceName,
      serviceDuration: service?.duration ?? booking.serviceDuration,
      servicePrice: service?.price ?? booking.servicePrice,
      clientName,
      clientPhone,
      clientEmail,
      notes: notes || undefined,
      internalNotes: internalNotes || undefined,
    })
    setEditing(false)
    onClose()
  }

  const handleDelete = () => {
    deleteBooking(booking.id)
    onClose()
  }

  const { bg, text, dot } = STATUS_COLORS[status]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1', bg, text)}>
              <span className={cn('w-1.5 h-1.5 rounded-full', dot)} />
              {STATUS_LABELS[status]}
            </span>
            <span className="text-xs text-muted-foreground">#{booking.id}</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {/* Status selector */}
          {editing ? (
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                Estado
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {STATUS_OPTIONS.map((s) => {
                  const c = STATUS_COLORS[s]
                  return (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={cn(
                        'flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide rounded-full px-3 py-1.5 border transition-all',
                        status === s
                          ? cn(c.bg, c.text, 'border-transparent')
                          : 'bg-background text-muted-foreground border-border hover:border-foreground/30'
                      )}
                    >
                      <span className={cn('w-1.5 h-1.5 rounded-full', c.dot)} />
                      {STATUS_LABELS[s]}
                      {status === s && <Check className="w-2.5 h-2.5" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          {/* Service */}
          <Section icon={<span className="text-primary text-xs font-bold">✦</span>} label="Servicio">
            {editing ? (
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2 focus:border-primary focus:outline-none"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {formatDuration(s.duration)}
                  </option>
                ))}
              </select>
            ) : (
              <div>
                <p className="text-sm font-semibold text-foreground">{booking.serviceName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDuration(booking.serviceDuration)}
                  {booking.servicePrice && ` · ${booking.servicePrice}€`}
                </p>
              </div>
            )}
          </Section>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <Section icon={<CalendarIcon className="w-3.5 h-3.5 text-primary" />} label="Fecha">
              {editing ? (
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-9 text-sm bg-background border-border rounded-xl"
                />
              ) : (
                <p className="text-sm font-medium text-foreground capitalize">{formattedDate}</p>
              )}
            </Section>
            <Section icon={<Clock className="w-3.5 h-3.5 text-primary" />} label="Hora">
              {editing ? (
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-9 text-sm bg-background border-border rounded-xl"
                />
              ) : (
                <p className="text-sm font-medium text-foreground">{booking.time}</p>
              )}
            </Section>
          </div>

          <div className="h-px bg-border" />

          {/* Client */}
          <Section icon={<User className="w-3.5 h-3.5 text-primary" />} label="Clienta">
            {editing ? (
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="h-9 text-sm bg-background border-border rounded-xl"
              />
            ) : (
              <p className="text-sm font-medium text-foreground">{booking.clientName}</p>
            )}
          </Section>

          <div className="grid grid-cols-2 gap-4">
            <Section icon={<Phone className="w-3.5 h-3.5 text-primary" />} label="Teléfono">
              {editing ? (
                <Input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="h-9 text-sm bg-background border-border rounded-xl"
                />
              ) : (
                <p className="text-sm font-medium text-foreground">{booking.clientPhone}</p>
              )}
            </Section>
            <Section icon={<Mail className="w-3.5 h-3.5 text-primary" />} label="Email">
              {editing ? (
                <Input
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="h-9 text-sm bg-background border-border rounded-xl"
                />
              ) : (
                <p className="text-sm font-medium text-foreground break-all">{booking.clientEmail}</p>
              )}
            </Section>
          </div>

          {/* Notes */}
          {(booking.notes || editing) && (
            <Section icon={<MessageSquare className="w-3.5 h-3.5 text-primary" />} label="Notas de la clienta">
              {editing ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="text-sm bg-background border-border rounded-xl resize-none"
                  placeholder="Notas o comentarios de la clienta…"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{booking.notes || '—'}</p>
              )}
            </Section>
          )}

          {/* Internal notes */}
          <Section
            icon={<FileText className="w-3.5 h-3.5 text-amber-500" />}
            label="Notas internas (solo admin)"
          >
            {editing ? (
              <Textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={2}
                className="text-sm bg-background border-border rounded-xl resize-none"
                placeholder="Notas privadas del equipo…"
              />
            ) : (
              <p className="text-sm text-muted-foreground italic">
                {booking.internalNotes || '—'}
              </p>
            )}
          </Section>
        </div>

        {/* Footer actions */}
        <div className="border-t border-border px-5 py-4 flex-shrink-0">
          {confirmDelete ? (
            <div className="space-y-3">
              <p className="text-xs text-center text-muted-foreground">
                ¿Seguro que quieres eliminar esta cita permanentemente?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 text-xs font-semibold border border-border rounded-full py-2 hover:border-foreground/30 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 text-xs font-semibold bg-red-500 text-white rounded-full py-2 hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ) : editing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 text-xs font-semibold border border-border rounded-full py-2.5 hover:border-foreground/30 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 text-xs font-semibold bg-foreground text-background rounded-full py-2.5 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Guardar cambios
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-xs font-semibold text-red-500 border border-red-100 rounded-full px-3 py-2.5 hover:bg-red-50 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setEditing(true)}
                className="flex-1 text-xs font-semibold bg-foreground text-background rounded-full py-2.5 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Editar cita
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
      <div className="pl-5">{children}</div>
    </div>
  )
}
