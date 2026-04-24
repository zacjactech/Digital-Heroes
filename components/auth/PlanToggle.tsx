'use client'

import { cn } from '@/lib/utils'

interface PlanToggleProps {
  selectedPlan: 'monthly' | 'yearly'
  setSelectedPlan: (plan: 'monthly' | 'yearly') => void
}

export default function PlanToggle({ selectedPlan, setSelectedPlan }: PlanToggleProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {/* Monthly */}
      <button
        type="button"
        onClick={() => setSelectedPlan('monthly')}
        className={cn(
          'p-8 rounded-2xl border-2 transition-all text-left group',
          selectedPlan === 'monthly'
            ? 'border-gold bg-gold/10'
            : 'border-auth-border bg-auth-surface/40 hover:border-auth-border/70 hover:bg-auth-surface',
        )}
      >
        <div className={cn(
          'font-heading font-semibold text-lg mb-3 transition-colors',
          selectedPlan === 'monthly' ? 'text-gold' : 'text-auth-text-muted group-hover:text-auth-text',
        )}>
          Monthly
        </div>
        <div className="font-mono text-3xl font-bold text-auth-text mb-1">£19.99</div>
        <div className="text-auth-text-muted text-sm">billed monthly</div>
      </button>

      {/* Yearly */}
      <button
        type="button"
        onClick={() => setSelectedPlan('yearly')}
        className={cn(
          'p-8 rounded-2xl border-2 transition-all text-left relative overflow-hidden group',
          selectedPlan === 'yearly'
            ? 'border-gold bg-gold/10'
            : 'border-auth-border bg-auth-surface/40 hover:border-auth-border/70 hover:bg-auth-surface',
        )}
      >
        {/* Save badge */}
        <div className="absolute top-0 right-0 bg-emerald text-forest text-[10px] font-black px-3 py-1.5 rounded-bl-xl tracking-widest">
          SAVE 20%
        </div>

        <div className={cn(
          'font-heading font-semibold text-lg mb-3 transition-colors',
          selectedPlan === 'yearly' ? 'text-gold' : 'text-auth-text-muted group-hover:text-auth-text',
        )}>
          Yearly
        </div>
        <div className="font-mono text-3xl font-bold text-auth-text mb-1">£199.99</div>
        <div className="text-auth-text-muted text-sm">billed annually</div>
      </button>
    </div>
  )
}