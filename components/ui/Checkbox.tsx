'use client'

import { cn } from '@/lib/utils'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: React.ReactNode
  disabled?: boolean
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <div className="relative shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
            checked
              ? 'bg-gold border-gold'
              : 'border-auth-border bg-transparent',
          )}
        >
          {checked && (
            <span className="material-symbols-outlined text-forest text-base leading-none">
              check
            </span>
          )}
        </div>
      </div>

      <span className="text-auth-text font-body text-sm leading-relaxed">
        {label}
      </span>
    </label>
  )
}