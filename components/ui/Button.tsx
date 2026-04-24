'use client'

import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-full border-none cursor-pointer transition-all duration-150 whitespace-nowrap select-none'

  const variants = {
    primary: 'bg-gold text-forest hover:bg-[#b8852e] hover:-translate-y-px active:translate-y-0',
    ghost:   'bg-transparent text-gold border border-gold hover:bg-gold hover:text-forest',
    outline: 'bg-transparent text-forest border border-soft-sage hover:border-forest',
    danger:  'bg-red-600 text-white hover:bg-red-700',
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-[0.9375rem]',
    lg: 'h-14 px-8 text-base',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed translate-y-0',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
