'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Servicio' },
  { number: 2, label: 'Fecha & Hora' },
  { number: 3, label: 'Tus datos' },
  { number: 4, label: 'Confirmación' },
]

interface BookingProgressProps {
  currentStep: number
}

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute left-0 right-0 top-4 h-px bg-border z-0" />
        <div
          className="absolute left-0 top-4 h-px bg-primary z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isDone = step.number < currentStep
          const isActive = step.number === currentStep

          return (
            <div
              key={step.number}
              className="flex flex-col items-center gap-2 z-10"
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-300',
                  isDone
                    ? 'bg-primary border-primary text-primary-foreground'
                    : isActive
                    ? 'bg-background border-primary text-primary scale-110 shadow-md'
                    : 'bg-background border-border text-muted-foreground'
                )}
              >
                {isDone ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium tracking-wide uppercase hidden sm:block',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
