'use client'

import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="font-mono text-xs uppercase tracking-widest text-moss mb-2 block"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full bg-leaf-wash text-forest placeholder-moss/30 rounded-lg border-2 border-transparent font-body py-3 px-4 transition-colors',
          'focus:outline-none focus:border-gold focus:bg-white',
          error && 'border-red-500 focus:border-red-500',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}