'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'
import type { BookingFlowState } from './booking-types'

// ─── Initial state ─────────────────────────────────────────────────────────────

const INITIAL_STATE: BookingFlowState = {
  selectedServiceId: null,
  selectedDate: null,
  selectedTime: null,
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  notes: '',
}

const SESSION_KEY = 'yuli_booking_flow'

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_SERVICE'; serviceId: string }
  | { type: 'SET_DATE'; date: string }
  | { type: 'SET_TIME'; time: string }
  | { type: 'SET_CLIENT_DATA'; name: string; phone: string; email: string; notes: string }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: BookingFlowState }

function reducer(state: BookingFlowState, action: Action): BookingFlowState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state
    case 'SET_SERVICE':
      return {
        ...INITIAL_STATE,
        selectedServiceId: action.serviceId,
      }
    case 'SET_DATE':
      return { ...state, selectedDate: action.date, selectedTime: null }
    case 'SET_TIME':
      return { ...state, selectedTime: action.time }
    case 'SET_CLIENT_DATA':
      return {
        ...state,
        clientName: action.name,
        clientPhone: action.phone,
        clientEmail: action.email,
        notes: action.notes,
      }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

interface BookingContextValue {
  state: BookingFlowState
  setService: (serviceId: string) => void
  setDate: (date: string) => void
  setTime: (time: string) => void
  setClientData: (name: string, phone: string, email: string, notes: string) => void
  reset: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) {
        dispatch({ type: 'HYDRATE', state: JSON.parse(stored) })
      }
    } catch (_) {}
  }, [])

  // Persist to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state))
    } catch (_) {}
  }, [state])

  const setService = (serviceId: string) =>
    dispatch({ type: 'SET_SERVICE', serviceId })

  const setDate = (date: string) =>
    dispatch({ type: 'SET_DATE', date })

  const setTime = (time: string) =>
    dispatch({ type: 'SET_TIME', time })

  const setClientData = (name: string, phone: string, email: string, notes: string) =>
    dispatch({ type: 'SET_CLIENT_DATA', name, phone, email, notes })

  const reset = () => {
    dispatch({ type: 'RESET' })
    try { sessionStorage.removeItem(SESSION_KEY) } catch (_) {}
  }

  return (
    <BookingContext.Provider
      value={{ state, setService, setDate, setTime, setClientData, reset }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
