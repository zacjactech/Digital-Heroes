'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface LoginFormProps {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  isLoading: boolean
  error: string
  errors: Record<string, string>
  handleSubmit: (e: React.FormEvent) => void
  rememberMe: boolean
  setRememberMe: (value: boolean) => void
}

// Underline-style input used throughout login — matches the stitch design
function AuthInput({
  type,
  value,
  onChange,
  disabled,
  placeholder,
  hasError,
}: {
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder: string
  hasError?: boolean
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={[
        'w-full bg-transparent border-0 border-b-2 py-4 font-body text-lg',
        'text-auth-text placeholder-auth-text-muted/40',
        'focus:outline-none transition-colors',
        hasError
          ? 'border-red-500 focus:border-red-400'
          : 'border-auth-border focus:border-gold',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    />
  )
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  error,
  errors,
  handleSubmit,
  rememberMe,
  setRememberMe,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-4xl font-bold text-auth-text mb-2">
          Welcome back
        </h2>
        <p className="text-auth-text-muted font-body">
          Enter your details to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Global error */}
        {error && (
          <div className="p-4 bg-red-950/60 border border-red-500/60 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-2 block">
            Email Address
          </label>
          <AuthInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="your@email.com"
            hasError={!!errors.email}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-2 block">
            Password
          </label>
          <div className="relative">
            <AuthInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              hasError={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-auth-text-muted hover:text-auth-text transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <span className="material-symbols-outlined text-xl">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember me + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-gold"
            />
            <span className="font-body text-auth-text-muted text-sm">
              Remember me
            </span>
          </label>
          <a
            href="#"
            className="font-body text-sm text-gold hover:text-gold/80 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="py-4 mt-2 shadow-[0_4px_14px_rgba(200,151,73,0.3)]"
        >
          Sign In
        </Button>
      </form>
    </div>
  )
}