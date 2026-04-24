import { cn } from '@/lib/utils'

type StatusPillVariant = 'active' | 'inactive' | 'lapsed' | 'cancelled' | 'pending' | 'verified' | 'paid' | 'rejected'

interface StatusPillProps {
  status: StatusPillVariant
  className?: string
}

const STATUS_CONFIG: Record<StatusPillVariant, { label: string; dot: string; pill: string }> = {
  active:    { label: 'Active',    dot: 'bg-emerald', pill: 'bg-emerald/10 text-emerald' },
  inactive:  { label: 'Inactive',  dot: 'bg-slate',   pill: 'bg-leaf-wash text-moss' },
  lapsed:    { label: 'Lapsed',    dot: 'bg-gold',    pill: 'bg-gold/10 text-[#b8852e]' },
  cancelled: { label: 'Cancelled', dot: 'bg-red-400', pill: 'bg-red-50 text-red-600' },
  pending:   { label: 'Pending',   dot: 'bg-gold',    pill: 'bg-gold/10 text-[#b8852e]' },
  verified:  { label: 'Verified',  dot: 'bg-emerald', pill: 'bg-emerald/10 text-emerald' },
  paid:      { label: 'Paid',      dot: 'bg-forest',  pill: 'bg-forest/10 text-forest' },
  rejected:  { label: 'Rejected',  dot: 'bg-red-400', pill: 'bg-red-50 text-red-600' },
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1',
        'rounded-full font-heading font-semibold text-xs',
        config.pill,
        className
      )}
    >
      <span className={cn('size-1.5 rounded-full', config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  )
}
