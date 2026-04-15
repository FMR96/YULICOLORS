import { addDays, format, subDays, addHours, setHours, setMinutes } from 'date-fns'
import type {
  Service,
  Booking,
  BlockedSlot,
  BookingStatus,
  BusinessSchedule,
} from './booking-types'

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: 'micropig-cejas',
    name: 'Micropigmentación de Cejas',
    category: 'micropigmentacion',
    duration: 120,
    price: 350,
    description: 'Diseño y pigmentación artística para unas cejas perfectas y naturales con efecto pelo a pelo.',
  },
  {
    id: 'microblading',
    name: 'Microblading',
    category: 'micropigmentacion',
    duration: 120,
    price: 320,
    description: 'Técnica manual de trazos ultra finos que imitan el pelo natural para un resultado hiperrealista.',
  },
  {
    id: 'micropig-labios',
    name: 'Micropigmentación de Labios',
    category: 'micropigmentacion',
    duration: 150,
    price: 380,
    priceFrom: true,
    description: 'Perfilado y relleno semipermanente para labios definidos, con color natural y duración prolongada.',
  },
  {
    id: 'eyeliner',
    name: 'Eyeliner Semipermanente',
    category: 'micropigmentacion',
    duration: 90,
    price: 280,
    description: 'Delineado preciso e intenso en la línea de las pestañas. Mirada definida sin esfuerzo diario.',
  },
  {
    id: 'lifting-pestanas',
    name: 'Lifting de Pestañas',
    category: 'cejas_pestanas',
    duration: 60,
    price: 65,
    description: 'Elevación y curvado permanente de tus pestañas naturales para una mirada abierta y luminosa.',
  },
  {
    id: 'laminado-cejas',
    name: 'Laminado de Cejas',
    category: 'cejas_pestanas',
    duration: 60,
    price: 55,
    description: 'Domamos y fijamos cada pelo en la dirección perfecta para unas cejas gruesas y con volumen natural.',
  },
  {
    id: 'depilacion-laser',
    name: 'Depilación Láser',
    category: 'depilacion',
    duration: 60,
    price: 80,
    priceFrom: true,
    description: 'Eliminación definitiva del vello no deseado con tecnología láser de última generación.',
  },
  {
    id: 'facial-premium',
    name: 'Tratamiento Facial Premium',
    category: 'facial',
    duration: 90,
    price: 120,
    description: 'Ritual facial personalizado con limpieza profunda, hidratación intensiva y masaje drenante.',
  },
  {
    id: 'masaje-relajante',
    name: 'Masaje Relajante',
    category: 'masaje',
    duration: 60,
    price: 75,
    description: 'Masaje de cuerpo completo con aceites esenciales premium para liberar tensiones y renovar la energía.',
  },
  {
    id: 'masaje-posoperatorio',
    name: 'Masaje Posoperatorio',
    category: 'masaje',
    duration: 60,
    price: 85,
    description: 'Drenaje linfático especializado para recuperación postquirúrgica. Reduce inflamación y mejora resultados.',
  },
  {
    id: 'eliminacion-tatuajes',
    name: 'Eliminación de Tatuajes',
    category: 'laser',
    duration: 30,
    price: 90,
    priceFrom: true,
    description: 'Eliminación progresiva con láser Q-Switched de alta precisión. Resultados seguros y efectivos.',
  },
]

// ─── Business schedule (Lun–Sáb, 10:00–20:00) ─────────────────────────────────

export const BUSINESS_SCHEDULE: BusinessSchedule[] = [
  { dayOfWeek: 0, isOpen: false, openTime: '10:00', closeTime: '20:00' }, // Dom
  { dayOfWeek: 1, isOpen: true, openTime: '10:00', closeTime: '20:00' },  // Lun
  { dayOfWeek: 2, isOpen: true, openTime: '10:00', closeTime: '20:00' },  // Mar
  { dayOfWeek: 3, isOpen: true, openTime: '10:00', closeTime: '20:00' },  // Mié
  { dayOfWeek: 4, isOpen: true, openTime: '10:00', closeTime: '20:00' },  // Jue
  { dayOfWeek: 5, isOpen: true, openTime: '10:00', closeTime: '20:00' },  // Vie
  { dayOfWeek: 6, isOpen: true, openTime: '10:00', closeTime: '15:00' },  // Sáb (mañanas)
]

// ─── Mock bookings (seed data for admin demo) ──────────────────────────────────

const today = new Date()
const fmt = (d: Date) => format(d, 'yyyy-MM-dd')

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-001',
    serviceId: 'micropig-cejas',
    serviceName: 'Micropigmentación de Cejas',
    serviceDuration: 120,
    servicePrice: 350,
    date: fmt(today),
    time: '10:00',
    clientName: 'Carmen López Martín',
    clientPhone: '612 345 678',
    clientEmail: 'carmen.lopez@email.com',
    notes: 'Primera vez, cejas escasas en la zona interior',
    status: 'confirmada',
    createdAt: subDays(today, 3).toISOString(),
  },
  {
    id: 'bk-002',
    serviceId: 'lifting-pestanas',
    serviceName: 'Lifting de Pestañas',
    serviceDuration: 60,
    servicePrice: 65,
    date: fmt(today),
    time: '12:00',
    clientName: 'Sofía Ramos García',
    clientPhone: '699 876 543',
    clientEmail: 'sofia.ramos@gmail.com',
    status: 'confirmada',
    createdAt: subDays(today, 1).toISOString(),
  },
  {
    id: 'bk-003',
    serviceId: 'masaje-relajante',
    serviceName: 'Masaje Relajante',
    serviceDuration: 60,
    servicePrice: 75,
    date: fmt(today),
    time: '16:00',
    clientName: 'Isabel Fernández',
    clientPhone: '655 111 222',
    clientEmail: 'isabel.f@hotmail.com',
    notes: 'Tensión en hombros y cuello',
    status: 'pendiente',
    createdAt: today.toISOString(),
  },
  {
    id: 'bk-004',
    serviceId: 'microblading',
    serviceName: 'Microblading',
    serviceDuration: 120,
    servicePrice: 320,
    date: fmt(addDays(today, 1)),
    time: '10:00',
    clientName: 'Lucía Torres Vega',
    clientPhone: '666 333 444',
    clientEmail: 'lucia.torres@email.es',
    status: 'confirmada',
    createdAt: subDays(today, 5).toISOString(),
  },
  {
    id: 'bk-005',
    serviceId: 'micropig-labios',
    serviceName: 'Micropigmentación de Labios',
    serviceDuration: 150,
    servicePrice: 380,
    date: fmt(addDays(today, 1)),
    time: '12:30',
    clientName: 'Ana Moreno Castillo',
    clientPhone: '677 555 666',
    clientEmail: 'ana.moreno@gmail.com',
    notes: 'Quiere un tono muy natural, casi nude',
    status: 'pendiente',
    createdAt: subDays(today, 2).toISOString(),
  },
  {
    id: 'bk-006',
    serviceId: 'facial-premium',
    serviceName: 'Tratamiento Facial Premium',
    serviceDuration: 90,
    servicePrice: 120,
    date: fmt(addDays(today, 2)),
    time: '11:00',
    clientName: 'Martina Sánchez',
    clientPhone: '688 777 888',
    clientEmail: 'martina.sanchez@email.com',
    status: 'confirmada',
    createdAt: subDays(today, 4).toISOString(),
  },
  {
    id: 'bk-007',
    serviceId: 'laminado-cejas',
    serviceName: 'Laminado de Cejas',
    serviceDuration: 60,
    servicePrice: 55,
    date: fmt(addDays(today, 2)),
    time: '13:00',
    clientName: 'Elena Díaz Ruiz',
    clientPhone: '611 999 000',
    clientEmail: 'elena.diaz@icloud.com',
    status: 'pendiente',
    createdAt: subDays(today, 1).toISOString(),
  },
  {
    id: 'bk-008',
    serviceId: 'depilacion-laser',
    serviceName: 'Depilación Láser',
    serviceDuration: 60,
    servicePrice: 80,
    date: fmt(addDays(today, 3)),
    time: '10:30',
    clientName: 'Paula Jiménez',
    clientPhone: '622 456 789',
    clientEmail: 'paula.jimenez@gmail.com',
    notes: 'Piernas completas',
    status: 'confirmada',
    createdAt: subDays(today, 6).toISOString(),
  },
  {
    id: 'bk-009',
    serviceId: 'masaje-posoperatorio',
    serviceName: 'Masaje Posoperatorio',
    serviceDuration: 60,
    servicePrice: 85,
    date: fmt(addDays(today, 3)),
    time: '17:00',
    clientName: 'Raquel Álvarez',
    clientPhone: '633 654 321',
    clientEmail: 'raquel.alvarez@yahoo.es',
    notes: 'Post rinoplastia, 3ª sesión',
    status: 'confirmada',
    createdAt: subDays(today, 8).toISOString(),
  },
  {
    id: 'bk-010',
    serviceId: 'eyeliner',
    serviceName: 'Eyeliner Semipermanente',
    serviceDuration: 90,
    servicePrice: 280,
    date: fmt(subDays(today, 1)),
    time: '11:00',
    clientName: 'Natalia Romero',
    clientPhone: '644 321 987',
    clientEmail: 'natalia.romero@email.com',
    status: 'completada',
    createdAt: subDays(today, 7).toISOString(),
  },
  {
    id: 'bk-011',
    serviceId: 'lifting-pestanas',
    serviceName: 'Lifting de Pestañas',
    serviceDuration: 60,
    servicePrice: 65,
    date: fmt(subDays(today, 2)),
    time: '10:00',
    clientName: 'Valentina Cruz',
    clientPhone: '655 789 012',
    clientEmail: 'vcruz@gmail.com',
    status: 'completada',
    createdAt: subDays(today, 9).toISOString(),
  },
  {
    id: 'bk-012',
    serviceId: 'micropig-cejas',
    serviceName: 'Micropigmentación de Cejas',
    serviceDuration: 120,
    servicePrice: 350,
    date: fmt(subDays(today, 3)),
    time: '15:00',
    clientName: 'Diana Herrera',
    clientPhone: '677 012 345',
    clientEmail: 'diana.h@hotmail.com',
    status: 'cancelada',
    internalNotes: 'Canceló por enfermedad. Reagendar.',
    createdAt: subDays(today, 10).toISOString(),
  },
  {
    id: 'bk-013',
    serviceId: 'eliminacion-tatuajes',
    serviceName: 'Eliminación de Tatuajes',
    serviceDuration: 30,
    servicePrice: 90,
    date: fmt(addDays(today, 5)),
    time: '10:00',
    clientName: 'Gabriela Morales',
    clientPhone: '699 234 567',
    clientEmail: 'gabi.morales@email.es',
    notes: 'Tatuaje en muñeca derecha, pequeño',
    status: 'pendiente',
    createdAt: today.toISOString(),
  },
]

export const MOCK_BLOCKED_SLOTS: BlockedSlot[] = [
  {
    id: 'bl-001',
    date: fmt(addDays(today, 7)),
    reason: 'Formación profesional',
  },
  {
    id: 'bl-002',
    date: fmt(addDays(today, 4)),
    time: '14:00',
    reason: 'Descanso',
  },
  {
    id: 'bl-003',
    date: fmt(addDays(today, 4)),
    time: '14:30',
    reason: 'Descanso',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

/** Generate time slots for a given date and service duration */
export function generateTimeSlots(
  dateStr: string,
  serviceDuration: number,
  existingBookings: Booking[],
  blockedSlots: BlockedSlot[]
): { time: string; available: boolean }[] {
  const date = new Date(dateStr + 'T00:00:00')
  const dayOfWeek = date.getDay()
  const schedule = BUSINESS_SCHEDULE.find((s) => s.dayOfWeek === dayOfWeek)

  if (!schedule || !schedule.isOpen) return []

  const [openH, openM] = schedule.openTime.split(':').map(Number)
  const [closeH, closeM] = schedule.closeTime.split(':').map(Number)

  const slots: { time: string; available: boolean }[] = []
  const now = new Date()
  const isToday = dateStr === format(now, 'yyyy-MM-dd')

  let currentMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM

  // Collect booked time ranges
  const bookedRanges = existingBookings
    .filter((b) => b.date === dateStr && b.status !== 'cancelada')
    .map((b) => {
      const [bH, bM] = b.time.split(':').map(Number)
      const startMin = bH * 60 + bM
      return { start: startMin, end: startMin + b.serviceDuration }
    })

  // Collect blocked individual times
  const blockedTimes = new Set(
    blockedSlots
      .filter((bl) => bl.date === dateStr && bl.time)
      .map((bl) => bl.time!)
  )

  while (currentMinutes + serviceDuration <= closeMinutes) {
    const hh = String(Math.floor(currentMinutes / 60)).padStart(2, '0')
    const mm = String(currentMinutes % 60).padStart(2, '0')
    const timeStr = `${hh}:${mm}`

    // Check if past (for today)
    if (isToday) {
      const slotDate = new Date(date)
      slotDate.setHours(Math.floor(currentMinutes / 60), currentMinutes % 60, 0, 0)
      if (slotDate <= now) {
        currentMinutes += 30
        continue
      }
    }

    // Check if blocked
    const isBlocked = blockedTimes.has(timeStr)

    // Check if overlaps with existing booking
    const slotEnd = currentMinutes + serviceDuration
    const hasConflict = bookedRanges.some(
      (r) => currentMinutes < r.end && slotEnd > r.start
    )

    slots.push({ time: timeStr, available: !isBlocked && !hasConflict })
    currentMinutes += 30
  }

  return slots
}

/** Check if a full date is blocked */
export function isDateFullyBlocked(dateStr: string, blockedSlots: BlockedSlot[]): boolean {
  return blockedSlots.some((bl) => bl.date === dateStr && !bl.time)
}

/** Check if a date is a business day */
export function isBusinessDay(date: Date): boolean {
  const dow = date.getDay()
  const schedule = BUSINESS_SCHEDULE.find((s) => s.dayOfWeek === dow)
  return schedule?.isOpen ?? false
}

/** Get bookings for a specific date */
export function getBookingsForDate(date: string, bookings: Booking[]): Booking[] {
  return bookings.filter((b) => b.date === date)
}

/** Status label in Spanish */
export const STATUS_LABELS: Record<BookingStatus, string> = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  completada: 'Completada',
  cancelada: 'Cancelada',
}

/** Status color classes (Tailwind) */
export const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; dot: string }> = {
  pendiente: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  confirmada: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  completada: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  cancelada: { bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-400' },
}

/** Category labels */
export const CATEGORY_LABELS: Record<string, string> = {
  micropigmentacion: 'Micropigmentación',
  cejas_pestanas: 'Cejas & Pestañas',
  depilacion: 'Depilación',
  facial: 'Facial',
  masaje: 'Masaje',
  laser: 'Láser',
}

/** Format duration nicely */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}
