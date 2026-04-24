'use client'

import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  targetDate: Date | string
  label?: string
  className?: string
  /** When expired — show custom message instead of zeroes */
  expiredMessage?: string
}

interface TimeUnitProps {
  value: number
  unit: string
}

function TimeUnit({ value, unit }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-forest/80 backdrop-blur-sm rounded-xl border border-gold/20">
        <span className="font-mono font-semibold text-2xl sm:text-3xl text-gold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-heading font-semibold text-xs uppercase tracking-widest text-slate">
        {unit}
      </span>
    </div>
  )
}

export function CountdownTimer({
  targetDate,
  label,
  className,
  expiredMessage = 'Draw is live!',
}: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div className={cn('text-center', className)}>
        <p className="font-heading font-bold text-xl text-gold">{expiredMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {label && (
        <p className="font-heading font-semibold text-sm uppercase tracking-widest text-slate">
          {label}
        </p>
      )}
      <div className="flex items-start gap-3 sm:gap-4">
        <TimeUnit value={days} unit="Days" />
        <span className="font-mono font-semibold text-2xl text-gold mt-4">:</span>
        <TimeUnit value={hours} unit="Hours" />
        <span className="font-mono font-semibold text-2xl text-gold mt-4">:</span>
        <TimeUnit value={minutes} unit="Mins" />
        <span className="font-mono font-semibold text-2xl text-gold mt-4">:</span>
        <TimeUnit value={seconds} unit="Secs" />
      </div>
    </div>
  )
}
