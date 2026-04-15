'use client'

import { useRouter } from 'next/navigation'
import { SERVICES, CATEGORY_LABELS, formatDuration } from '@/lib/booking-data'
import { useBooking } from '@/lib/booking-store'
import { BookingProgress } from '@/components/booking/booking-progress'
import { cn } from '@/lib/utils'
import { Clock, ChevronRight, Sparkles } from 'lucide-react'
import type { ServiceCategory } from '@/lib/booking-types'
import { useState } from 'react'

const CATEGORY_ORDER: ServiceCategory[] = [
  'micropigmentacion',
  'cejas_pestanas',
  'depilacion',
  'facial',
  'masaje',
  'laser',
]

export default function ReservarPage() {
  const router = useRouter()
  const { setService, state } = useBooking()
  const [hovered, setHovered] = useState<string | null>(null)

  const handleSelect = (serviceId: string) => {
    setService(serviceId)
    router.push('/reservar/fecha')
  }

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof SERVICES>>(
    (acc, cat) => {
      const items = SERVICES.filter((s) => s.category === cat)
      if (items.length) acc[cat] = items
      return acc
    },
    {}
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pb-24">
      {/* Progress */}
      <BookingProgress currentStep={1} />

      {/* Header */}
      <div className="mt-12 mb-10 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">
          Paso 1 de 4
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
          ¿Qué tratamiento deseas?
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Selecciona el servicio que mejor se adapte a tus necesidades. Cada tratamiento está
          realizado con los más altos estándares de calidad.
        </p>
      </div>

      {/* Service groups */}
      <div className="space-y-10">
        {Object.entries(grouped).map(([category, services]) => (
          <section key={category}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary">
                {CATEGORY_LABELS[category]}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => {
                const isSelected = state.selectedServiceId === service.id
                const isHov = hovered === service.id

                return (
                  <button
                    key={service.id}
                    onClick={() => handleSelect(service.id)}
                    onMouseEnter={() => setHovered(service.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      'group relative text-left rounded-xl border p-5 transition-all duration-300 cursor-pointer',
                      'hover:shadow-lg hover:-translate-y-0.5',
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/30'
                        : 'border-border bg-card hover:border-primary/50'
                    )}
                  >
                    {/* Gold dot indicator */}
                    {isSelected && (
                      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />
                    )}

                    <div className="space-y-2">
                      <h3
                        className={cn(
                          'font-serif text-lg leading-snug transition-colors',
                          isSelected || isHov ? 'text-primary' : 'text-foreground'
                        )}
                      >
                        {service.name}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{formatDuration(service.duration)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {service.price !== null && (
                            <span className="text-sm font-semibold text-foreground">
                              {service.priceFrom && (
                                <span className="text-[10px] font-normal text-muted-foreground mr-0.5">
                                  desde{' '}
                                </span>
                              )}
                              {service.price}€
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div
                      className={cn(
                        'flex items-center gap-1 mt-3 text-xs font-medium transition-colors',
                        isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                      )}
                    >
                      <Sparkles className="w-3 h-3" />
                      {isSelected ? 'Seleccionado' : 'Seleccionar'}
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Floating CTA if service selected */}
      {state.selectedServiceId && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => router.push('/reservar/fecha')}
            className="flex items-center gap-2 bg-foreground text-background px-8 py-3.5 rounded-full text-sm font-semibold shadow-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            Elegir fecha y hora
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
