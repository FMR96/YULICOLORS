'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useBooking } from '@/lib/booking-store'
import { getServiceById, formatDuration } from '@/lib/booking-data'
import { BookingProgress } from '@/components/booking/booking-progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight, User, Phone, Mail, MessageSquare, Clock, CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'Nombre demasiado largo'),
  phone: z
    .string()
    .min(9, 'Introduce un teléfono válido')
    .regex(/^[\d\s\+\-\(\)]{9,15}$/, 'Formato de teléfono no válido'),
  email: z.string().email('Introduce un email válido'),
  notes: z.string().max(300, 'Máximo 300 caracteres').optional(),
})

type FormData = z.infer<typeof schema>

export default function DatosPage() {
  const router = useRouter()
  const { state, setClientData } = useBooking()

  const service = state.selectedServiceId ? getServiceById(state.selectedServiceId) : null

  useEffect(() => {
    if (!state.selectedServiceId || !state.selectedDate || !state.selectedTime) {
      router.replace('/reservar')
    }
  }, [state, router])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: state.clientName,
      phone: state.clientPhone,
      email: state.clientEmail,
      notes: state.notes,
    },
  })

  const onSubmit = (data: FormData) => {
    setClientData(data.name, data.phone, data.email, data.notes ?? '')
    router.push('/reservar/confirmacion')
  }

  const formattedDate =
    state.selectedDate
      ? format(new Date(state.selectedDate + 'T00:00:00'), "EEEE d 'de' MMMM yyyy", { locale: es })
      : ''

  if (!service) return null

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pb-24">
      <BookingProgress currentStep={3} />

      <div className="mt-12 mb-10 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">
          Paso 3 de 4
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
          Tus datos
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Necesitamos algunos datos para confirmar tu cita. Toda la información se trata con total confidencialidad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-3xl mx-auto">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 space-y-5"
        >
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Nombre completo *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Tu nombre y apellidos"
                className={cn(
                  'pl-10 h-12 bg-background border-border rounded-xl focus:border-primary transition-colors',
                  errors.name && 'border-destructive focus:border-destructive'
                )}
                {...register('name')}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Teléfono *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="600 000 000"
                className={cn(
                  'pl-10 h-12 bg-background border-border rounded-xl focus:border-primary transition-colors',
                  errors.phone && 'border-destructive focus:border-destructive'
                )}
                {...register('phone')}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className={cn(
                  'pl-10 h-12 bg-background border-border rounded-xl focus:border-primary transition-colors',
                  errors.email && 'border-destructive focus:border-destructive'
                )}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Notas o comentarios{' '}
              <span className="normal-case font-normal">(opcional)</span>
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
              <Textarea
                id="notes"
                placeholder="Alergias, preferencias, preguntas…"
                rows={3}
                className={cn(
                  'pl-10 bg-background border-border rounded-xl focus:border-primary transition-colors resize-none',
                  errors.notes && 'border-destructive'
                )}
                {...register('notes')}
              />
            </div>
            {errors.notes && (
              <p className="text-xs text-destructive">{errors.notes.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => router.push('/reservar/fecha')}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Cambiar fecha
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                'flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                isValid
                  ? 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:scale-105'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              Revisar cita
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Booking summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-24 space-y-4">
            <h3 className="font-serif text-base text-foreground">Tu reserva</h3>
            <div className="h-px bg-border" />

            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs">✦</span>
                </div>
                <div>
                  <p className="font-medium text-foreground leading-tight">{service.name}</p>
                  <p className="text-muted-foreground text-xs">{formatDuration(service.duration)}</p>
                </div>
              </div>

              {state.selectedDate && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground leading-tight capitalize">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              )}

              {state.selectedTime && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{state.selectedTime}</p>
                  </div>
                </div>
              )}
            </div>

            {service.price !== null && (
              <>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {service.priceFrom ? 'Desde' : 'Precio'}
                  </span>
                  <span className="font-semibold text-foreground text-base">
                    {service.price}€
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
