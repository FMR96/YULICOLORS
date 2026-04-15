'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  CalendarDays,
  List,
  LogOut,
  Sparkles,
  PlusCircle,
  X,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/calendario', label: 'Calendario', icon: CalendarDays, exact: false },
  { href: '/admin/reservas', label: 'Reservas', icon: List, exact: false },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('yuli_admin_auth')
    router.push('/admin/login')
  }

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside className="flex flex-col h-full bg-[#1a1512] text-stone-300 w-64">
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/8 flex items-center justify-between">
        <div>
          <p className="font-serif text-lg tracking-widest text-white">YULI COLORS</p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mt-0.5">
            Admin Panel
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-stone-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick actions */}
      <div className="px-4 pt-5 pb-3 space-y-2">
        <Link
          href="/admin/nueva"
          onClick={onClose}
          className="flex items-center gap-2.5 w-full bg-primary/15 hover:bg-primary/25 border border-primary/20 rounded-xl px-4 py-2.5 text-sm font-medium text-primary transition-all duration-200 group"
        >
          <PlusCircle className="w-4 h-4" />
          Nueva reserva manual
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-white/10 text-white'
                  : 'text-stone-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'w-4 h-4 flex-shrink-0',
                  active ? 'text-primary' : 'text-stone-500'
                )}
              />
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-4 pb-6 space-y-2 border-t border-white/8 pt-4">
        <Link
          href="/reservar"
          onClick={onClose}
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-stone-500 hover:text-stone-300 hover:bg-white/5 transition-all duration-200"
        >
          <Sparkles className="w-4 h-4" />
          Ver página de reservas
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
