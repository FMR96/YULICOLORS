// ─── Booking Types ────────────────────────────────────────────────────────────

export type ServiceCategory =
  | 'micropigmentacion'
  | 'cejas_pestanas'
  | 'depilacion'
  | 'facial'
  | 'masaje'
  | 'laser'

export type BookingStatus = 'pendiente' | 'confirmada' | 'completada' | 'cancelada'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  duration: number        // minutes
  price: number | null
  priceFrom?: boolean     // "Desde X€"
  description: string
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  serviceDuration: number
  servicePrice: number | null
  date: string            // "YYYY-MM-DD"
  time: string            // "HH:MM"
  clientName: string
  clientPhone: string
  clientEmail: string
  notes?: string
  status: BookingStatus
  createdAt: string       // ISO string
  internalNotes?: string
}

export interface BlockedSlot {
  id: string
  date: string            // "YYYY-MM-DD"
  time?: string           // undefined = full day blocked
  reason?: string
}

// ─── Booking flow state (sessionStorage) ──────────────────────────────────────
export interface BookingFlowState {
  selectedServiceId: string | null
  selectedDate: string | null   // "YYYY-MM-DD"
  selectedTime: string | null   // "HH:MM"
  clientName: string
  clientPhone: string
  clientEmail: string
  notes: string
}

// ─── Admin state (localStorage) ───────────────────────────────────────────────
export interface AdminState {
  bookings: Booking[]
  blockedSlots: BlockedSlot[]
}

export interface BusinessSchedule {
  dayOfWeek: number   // 0=Dom, 1=Lun … 6=Sáb
  isOpen: boolean
  openTime: string    // "HH:MM"
  closeTime: string   // "HH:MM"
}
