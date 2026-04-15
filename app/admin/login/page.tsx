'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Sparkles, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const ADMIN_PASSWORD = 'yuli2024'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate auth delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('yuli_admin_auth', 'true')
        router.push('/admin')
      } else {
        setError('Contraseña incorrecta. Inténtalo de nuevo.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20">
            <span className="font-serif text-2xl text-primary">Y</span>
          </div>
          <div>
            <p className="font-serif text-2xl tracking-widest text-foreground">YULI COLORS</p>
            <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mt-1">
              Panel de administración
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-7 shadow-sm space-y-5">
          <div>
            <h1 className="font-serif text-xl text-foreground">Acceso restringido</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Introduce tu contraseña de administrador
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    'pl-10 pr-10 h-12 bg-background border-border rounded-xl focus:border-primary transition-colors',
                    error && 'border-destructive focus:border-destructive'
                  )}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-300',
                password && !loading
                  ? 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:scale-[1.02]'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Verificando…
                </>
              ) : (
                'Entrar al panel'
              )}
            </button>
          </form>

          <p className="text-[10px] text-muted-foreground text-center">
            Demo: contraseña <span className="font-mono font-bold">yuli2024</span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground/40">
          <Sparkles className="w-3 h-3" />
          <p className="text-[10px] tracking-widest uppercase">
            Yuli Colors · Centro de Estética Premium
          </p>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}
