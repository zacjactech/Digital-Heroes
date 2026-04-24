import { cn } from '@/lib/utils'

type BadgeVariant = 'active' | 'lapsed' | 'inactive' | 'winner' | 'pending' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  active:   'bg-emerald text-white',
  lapsed:   'bg-gold text-forest',
  inactive: 'bg-soft-sage text-moss',
  winner:   'bg-forest text-gold',
  pending:  'bg-leaf-wash text-moss border border-soft-sage',
  default:  'bg-leaf-wash text-ink',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-0.5',
        'rounded-full font-heading font-semibold text-xs uppercase tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
