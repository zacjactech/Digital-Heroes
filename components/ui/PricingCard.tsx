'use client'

import { useState } from 'react'
import { startCheckout } from '@/app/actions/stripe-server'

interface PricingCardProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  priceId: string
  buttonText: string
  highlight?: boolean
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  priceId,
  buttonText,
  highlight = false,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false)

  async function onSubscribe() {
    setLoading(true)
    try {
      await startCheckout(priceId)
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className={`relative p-8 rounded-3xl transition-all duration-300 flex flex-col h-full ${
        highlight 
          ? 'bg-forest text-white shadow-2xl shadow-forest/20 scale-105 z-10' 
          : 'bg-white text-ink border border-soft-sage shadow-xl shadow-ink/5 hover:border-gold/50'
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-forest font-heading font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
          Best Value
        </div>
      )}

      <div className="mb-8">
        <h3 className={`font-display text-2xl mb-2 ${highlight ? 'text-gold' : 'text-forest'}`}>
          {name}
        </h3>
        <p className={`text-sm leading-relaxed ${highlight ? 'text-white/70' : 'text-moss'}`}>
          {description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold font-display">£{price}</span>
          <span className={`text-sm ${highlight ? 'text-white/60' : 'text-moss'}`}>/{period}</span>
        </div>
      </div>

      <div className="flex-grow space-y-4 mb-10">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className={`material-symbols-outlined text-sm mt-1 ${highlight ? 'text-gold' : 'text-emerald'}`}>
              check_circle
            </span>
            <span className={`text-sm ${highlight ? 'text-white/90' : 'text-ink/80'}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onSubscribe}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-heading font-bold transition-all flex items-center justify-center gap-2 group ${
          highlight
            ? 'bg-gold text-forest hover:bg-white hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-forest text-white hover:bg-gold hover:text-forest hover:scale-[1.02] active:scale-[0.98]'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {buttonText}
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </>
        )}
      </button>
    </div>
  )
}
