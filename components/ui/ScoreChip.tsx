import { cn } from '@/lib/utils'

interface ScoreChipProps {
  value?: number
  date?: string
  isActive?: boolean
  isEmpty?: boolean
  isOldest?: boolean
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

/**
 * ScoreChip — 48×48px score display tile.
 * Core reusable: used in score tracker, entry form, and draw entry display.
 * Number display always uses JetBrains Mono per design rules.
 */
export function ScoreChip({
  value,
  date,
  isActive = false,
  isEmpty = false,
  isOldest = false,
  onEdit,
  onDelete,
  className,
}: ScoreChipProps) {
  if (isEmpty) {
    return (
      <div
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-lg',
          'border border-dashed border-soft-sage bg-sage-tint',
          'opacity-40',
          className
        )}
        aria-label="Empty score slot"
      >
        <span className="font-mono text-slate text-lg">–</span>
      </div>
    )
  }

  return (
    <div className={cn('relative group', className)}>
      <button
        onClick={onEdit}
        disabled={!onEdit}
        title={date ? `Score: ${value} on ${date}` : undefined}
        aria-label={`Score ${value}${date ? ` on ${date}` : ''}`}
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-lg',
          'font-mono font-semibold text-lg',
          'border transition-all duration-150',
          isActive
            ? 'bg-forest text-gold border-forest shadow-md'
            : 'bg-sage-tint text-ink border-soft-sage',
          isOldest && 'opacity-60',
          onEdit && 'hover:border-gold hover:shadow-gold',
          !onEdit && 'cursor-default'
        )}
      >
        {value}
      </button>

      {/* Delete button — visible on hover when onDelete provided */}
      {onDelete && (
        <button
          onClick={onDelete}
          aria-label="Delete score"
          className={cn(
            'absolute -top-1.5 -right-1.5',
            'size-4 rounded-full bg-red-500 text-white',
            'text-[10px] font-bold leading-none',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
            'flex items-center justify-center'
          )}
        >
          ×
        </button>
      )}
    </div>
  )
}
