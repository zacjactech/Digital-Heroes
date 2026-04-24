'use client'

import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

export function Select({
  label,
  options,
  value,
  onChange,
  disabled = false,
  error,
}: SelectProps) {
  return (
    <div className="w-full">
      <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-2 block">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            'w-full bg-auth-surface text-auth-text rounded-xl border-2 font-body py-4 px-5',
            'appearance-none cursor-pointer transition-colors',
            'focus:outline-none focus:border-gold hover:border-auth-border/70',
            error ? 'border-red-500 focus:border-red-400' : 'border-auth-border',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-auth-surface text-auth-text"
            >
              {option.label}
            </option>
          ))}
        </select>

        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-auth-text-muted pointer-events-none">
          expand_more
        </span>
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}