'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-heading font-semibold text-sm text-moss"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full min-h-11 px-4 py-3',
            'bg-leaf-wash border border-soft-sage rounded-lg',
            'font-body text-base text-ink placeholder:text-slate',
            'transition-all duration-150',
            'focus:outline-none focus:border-gold focus:shadow-[0_0_0_2px_rgba(200,151,73,0.25)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.25)]',
            className
          )}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-slate text-sm">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
