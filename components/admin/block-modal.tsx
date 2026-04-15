'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { useAdmin } from '@/lib/admin-store'
import type { BlockedSlot } from '@/lib/booking-types'
import { BUSINESS_SCHEDULE } from '@/lib/booking-data'
import { X, Ban, Clock, CalendarIcon, AlertTriangle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface BlockModalProps {
  defaultDate?: string
  onClose: () => void
}

type BlockType = 'full_day' | 'time_slot' | 'multiple_slots'

export function BlockModal({ defaultDate, onClose }: BlockModalProps) {
  const { addBlockedSlot } = useAdmin()
  const [blockType, setBlockType] = useState<BlockType>('full_day')
  const [date, setDate] = useState(defaultDate ?? format(new Date(), 'yyyy-MM-dd'))
  const [startTime, setStartTime] = useState('14:00')
  const [endTime, setEndTime] = useState('14:30')
  const [reason, setReason] = useState('')

  // Generate all 30-min slots for the business day
  const allSlots: string[] = []
  {
    const dow = new Date(date + 'T00:00:00').getDay()
    const schedule = BUSINESS_SCHEDULE.find((s) => s.dayOfWeek === dow)
    if (schedule?.isOpen) {
      const [oh, om] = schedule.openTime.split(':').map(Number)
      const [ch, cm] = schedule.closeTime.split(':').map(Number)
      let cur = oh * 60 + om
      const end = ch * 60 + cm
      while (cur < end) {
        const hh = String(Math.floor(cur / 60)).padStart(2, '0')
        const mm = String(cur % 60).padStart(2, '0')
        allSlots.push(`${hh}:${mm}`)
        cur += 30
      }
    }
  }

  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set())

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) => {
      const next = new Set(prev)
      if (next.has(slot)) next.delete(slot)
      else next.add(slot)
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (blockType === 'full_day') {
      const slot: BlockedSlot = {
        id: `bl-${Date.now()}`,
        date,
        reason: reason || undefined,
      }
      addBlockedSlot(slot)
    } else if (blockType === 'time_slot') {
      // Block the range as individual 30-min slots
      const [sh, sm] = startTime.split(':').map(Number)
      const [eh, em] = endTime.split(':').map(Number)
      let cur = sh * 60 + sm
      const end = eh * 60 + em
      while (cur < end) {
        const hh = String(Math.floor(cur / 60)).padStart(2, '0')
        const mm = String(cur % 60).padStart(2, '0')
        addBlockedSlot({
          id: `bl-${Date.now()}-${cur}`,
          date,
          time: `${hh}:${mm}`,
          reason: reason || undefined,
        })
        cur += 30
      }
    } else {
      // Multiple selected slots
      selectedSlots.forEach((slot) => {
        addBlockedSlot({
          id: `bl-${Date.now()}-${slot}`,
          date,
          time: slot,
          reason: reason || undefined,
        })
      })
    }

    onClose()
  }

  const isValid =
    blockType === 'full_day'
      ? !!date
      : blockType === 'time_slot'
      ? !!date && startTime < endTime
      : selectedSlots.size > 0

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-red-500" />
            <h2 className="font-semibold text-sm text-foreground">Bloquear disponibilidad</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Block type selector */}
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Tipo de bloqueo
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'full_day' as BlockType, label: 'Día completo', icon: <CalendarIcon className="w-4 h-4" /> },
                { value: 'time_slot' as BlockType, label: 'Rango horario', icon: <Clock className="w-4 h-4" /> },
                { value: 'multiple_slots' as BlockType, label: 'Horas sueltas', icon: <Ban className="w-4 h-4" /> },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBlockType(opt.value)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all',
                    blockType === opt.value
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-background border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  )}
                >
                  {opt.icon}
                  <span className="text-center leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date picker */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Fecha
            </Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 bg-background border-border rounded-xl"
              required
            />
          </div>

          {/* Time range */}
          {blockType === 'time_slot' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Desde
                </Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-11 bg-background border-border rounded-xl"
                  step="1800"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Hasta
                </Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-11 bg-background border-border rounded-xl"
                  step="1800"
                />
              </div>
              {startTime >= endTime && (
                <div className="col-span-2 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  La hora de inicio debe ser anterior a la de fin
                </div>
              )}
            </div>
          )}

          {/* Multiple slot selector */}
          {blockType === 'multiple_slots' && (
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                Selecciona las horas a bloquear
              </Label>
              {allSlots.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No hay horario disponible para esta fecha (puede ser domingo o fuera de horario).
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto">
                  {allSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => toggleSlot(slot)}
                      className={cn(
                        'text-xs font-medium py-1.5 rounded-lg border transition-all',
                        selectedSlots.has(slot)
                          ? 'bg-red-50 border-red-200 text-red-600'
                          : 'bg-background border-border text-muted-foreground hover:border-red-200 hover:text-red-500'
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reason */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Motivo{' '}
              <span className="normal-case font-normal">(opcional)</span>
            </Label>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ej: Formación, vacaciones, descanso…"
              className="h-11 bg-background border-border rounded-xl text-sm"
            />
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50/50 border border-amber-100 rounded-xl px-3 py-2.5">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <p>
              Las clientas no podrán reservar en los horarios bloqueados. Los bloqueos no cancelan
              citas ya confirmadas.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm font-semibold border border-border rounded-full py-2.5 hover:border-foreground/30 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                'flex-1 text-sm font-semibold rounded-full py-2.5 transition-all',
                isValid
                  ? 'bg-red-500 text-white hover:bg-red-600 hover:scale-[1.01]'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              Confirmar bloqueo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
