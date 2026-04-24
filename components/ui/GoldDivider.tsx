/**
 * GoldDivider — the canonical gold separator used between all major page sections.
 * Always appears as a gradient line fading from transparent → gold → transparent.
 */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <hr
      className={[
        'border-none h-px w-full',
        'bg-gradient-to-r from-transparent via-gold to-transparent',
        className ?? '',
      ]
        .join(' ')
        .trim()}
      aria-hidden="true"
    />
  )
}
