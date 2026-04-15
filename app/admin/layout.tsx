'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminProvider } from '@/lib/admin-store'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Menu } from 'lucide-react'

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('yuli_admin_auth')
    if (!auth && pathname !== '/admin/login') {
      router.replace('/admin/login')
    } else {
      setChecked(true)
    }
  }, [pathname, router])

  if (!checked) return null
  return <>{children}</>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <AdminProvider>
      <AdminAuthGuard>
        <div className="flex h-screen overflow-hidden bg-background">
          {/* Desktop sidebar */}
          <div className="hidden lg:flex flex-shrink-0">
            <AdminSidebar />
          </div>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative z-10">
                <AdminSidebar onClose={() => setSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile top bar */}
            <div className="lg:hidden flex items-center gap-3 px-4 h-14 border-b border-border bg-card">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="font-serif text-base tracking-widest text-foreground">
                YULI COLORS
              </span>
            </div>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </AdminAuthGuard>
    </AdminProvider>
  )
}
