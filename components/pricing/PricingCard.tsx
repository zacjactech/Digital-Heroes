'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  savings?: string;
  isLoading?: boolean;
  onCTA: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  description,
  features,
  featured = false,
  savings,
  isLoading = false,
  onCTA
}) => {
  return (
    <div 
      className={cn(
        "relative rounded-xl p-8 flex flex-col h-full border transition-all duration-300",
        featured 
          ? "bg-forest text-white border-gold/50 shadow-[0_0_30px_rgba(200,151,73,0.1)]"
          : "bg-auth-surface text-auth-text border-auth-border hover:border-auth-text-muted/30"
      )}
    >
      {featured && (
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-gold text-forest px-4 py-1 rounded-sm font-heading text-[10px] font-bold tracking-widest shadow-md">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h2 className={cn(
          "font-heading text-3xl font-bold mb-2",
          featured ? "text-white" : "text-auth-text"
        )}>
          {name}
        </h2>
        <p className={cn(
          "font-body text-base",
          featured ? "text-white/70" : "text-auth-text-muted"
        )}>
          {description}
        </p>
      </div>

      <div className="mb-8 flex items-baseline gap-2 flex-wrap">
        <span className={cn(
          "font-mono text-4xl font-bold tracking-tighter",
          featured ? "text-gold" : "text-auth-text"
        )}>
          £{price}
        </span>
        <span className={cn(
          "font-body text-base",
          featured ? "text-white/70" : "text-auth-text-muted"
        )}>
          {period}
        </span>
        {savings && (
          <span className="ml-2 px-2 py-0.5 bg-emerald/20 text-emerald rounded text-[10px] font-bold uppercase tracking-wider">
            {savings}
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-4 mb-10 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <span 
              className={cn(
                "material-symbols-outlined text-lg",
                featured ? "text-gold" : "text-emerald"
              )}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className={cn(
              "font-body text-base",
              featured ? "text-white/90" : "text-auth-text"
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCTA}
        disabled={isLoading}
        className={cn(
          "w-full py-4 rounded font-heading text-xs font-bold uppercase tracking-widest transition-all duration-300",
          featured 
            ? "bg-gold text-forest hover:bg-gold/90 shadow-[0_0_15px_rgba(200,151,73,0.3)]"
            : "border border-gold text-gold hover:bg-gold/10",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        {isLoading ? 'Processing...' : featured ? 'Start Yearly' : 'Start Monthly'}
      </button>
    </div>
  );
};
