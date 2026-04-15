'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { MOCK_BOOKINGS, MOCK_BLOCKED_SLOTS } from './booking-data'
import type { AdminState, Booking, BlockedSlot, BookingStatus } from './booking-types'

const STORAGE_KEY = 'yuli_admin_data'

// ─── Initial state ─────────────────────────────────────────────────────────────

const INITIAL_STATE: AdminState = {
  bookings: MOCK_BOOKINGS,
  blockedSlots: MOCK_BLOCKED_SLOTS,
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'HYDRATE'; state: AdminState }
  | { type: 'ADD_BOOKING'; booking: Booking }
  | { type: 'UPDATE_BOOKING'; id: string; changes: Partial<Booking> }
  | { type: 'UPDATE_STATUS'; id: string; status: BookingStatus }
  | { type: 'DELETE_BOOKING'; id: string }
  | { type: 'ADD_BLOCKED'; slot: BlockedSlot }
  | { type: 'REMOVE_BLOCKED'; id: string }

function reducer(state: AdminState, action: Action): AdminState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state

    case 'ADD_BOOKING':
      return { ...state, bookings: [action.booking, ...state.bookings] }

    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.id ? { ...b, ...action.changes } : b
        ),
      }

    case 'UPDATE_STATUS':
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.id ? { ...b, status: action.status } : b
        ),
      }

    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.id),
      }

    case 'ADD_BLOCKED':
      return { ...state, blockedSlots: [...state.blockedSlots, action.slot] }

    case 'REMOVE_BLOCKED':
      return {
        ...state,
        blockedSlots: state.blockedSlots.filter((s) => s.id !== action.id),
      }

    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

interface AdminContextValue {
  state: AdminState
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, changes: Partial<Booking>) => void
  updateStatus: (id: string, status: BookingStatus) => void
  deleteBooking: (id: string) => void
  addBlockedSlot: (slot: BlockedSlot) => void
  removeBlockedSlot: (id: string) => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        dispatch({ type: 'HYDRATE', state: JSON.parse(stored) })
      }
    } catch (_) {}
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (_) {}
  }, [state])

  const addBooking = (booking: Booking) =>
    dispatch({ type: 'ADD_BOOKING', booking })

  const updateBooking = (id: string, changes: Partial<Booking>) =>
    dispatch({ type: 'UPDATE_BOOKING', id, changes })

  const updateStatus = (id: string, status: BookingStatus) =>
    dispatch({ type: 'UPDATE_STATUS', id, status })

  const deleteBooking = (id: string) =>
    dispatch({ type: 'DELETE_BOOKING', id })

  const addBlockedSlot = (slot: BlockedSlot) =>
    dispatch({ type: 'ADD_BLOCKED', slot })

  const removeBlockedSlot = (id: string) =>
    dispatch({ type: 'REMOVE_BLOCKED', id })

  return (
    <AdminContext.Provider
      value={{
        state,
        addBooking,
        updateBooking,
        updateStatus,
        deleteBooking,
        addBlockedSlot,
        removeBlockedSlot,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
