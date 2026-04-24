'use client'

interface Avatar {
  initials: string
  bg: string
}

const AVATARS: Avatar[] = [
  { initials: 'JH', bg: 'var(--color-canopy)' },
  { initials: 'SR', bg: 'var(--color-moss)'   },
  { initials: 'TW', bg: 'var(--color-forest)' },
  { initials: 'AM', bg: 'var(--color-canopy)' },
]

interface SocialProofProps {
  subscriberCount?: number
}

export default function SocialProof({ subscriberCount = 2400 }: SocialProofProps) {
  return (
    <div className="mt-16 pt-8 border-t border-auth-border text-center">
      <p className="text-auth-text-muted font-body text-sm mb-4">
        {subscriberCount.toLocaleString()}+ subscribers making a difference
      </p>

      <div className="flex justify-center -space-x-3">
        {AVATARS.map((av) => (
          <div
            key={av.initials}
            className="w-10 h-10 rounded-full border-2 border-auth-bg flex items-center justify-center font-mono text-xs font-bold text-auth-text shrink-0"
            style={{ backgroundColor: av.bg }}
            aria-label={`Subscriber ${av.initials}`}
          >
            {av.initials}
          </div>
        ))}

        {/* "+2k" overflow badge */}
        <div className="w-10 h-10 rounded-full border-2 border-auth-bg bg-auth-surface-hi flex items-center justify-center font-mono text-xs text-gold shrink-0">
          +2k
        </div>
      </div>
    </div>
  )
}