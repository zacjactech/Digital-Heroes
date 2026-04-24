'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BillingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ 
  billingCycle, 
  setBillingCycle 
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-16">
      <div className="flex items-center gap-6">
        <span className={cn(
          "font-heading font-bold text-xs uppercase tracking-widest transition-colors duration-300",
          billingCycle === 'monthly' ? "text-gold" : "text-auth-text-muted"
        )}>
          Monthly
        </span>
        
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className="w-14 h-8 bg-auth-surface-hi rounded-full p-1 relative transition-colors focus:outline-none ring-1 ring-auth-border"
        >
          <div 
            className={cn(
              "w-6 h-6 bg-gold rounded-full shadow-sm transition-transform duration-300",
              billingCycle === 'yearly' ? "translate-x-6" : "translate-x-0"
            )} 
          />
        </button>

        <div className="flex items-center gap-3">
          <span className={cn(
            "font-heading font-bold text-xs uppercase tracking-widest transition-colors duration-300",
            billingCycle === 'yearly' ? "text-gold" : "text-auth-text-muted"
          )}>
            Yearly
          </span>
          <span className="bg-gold/20 text-gold font-heading text-[10px] font-bold px-2 py-0.5 rounded border border-gold/30">
            Save 20%
          </span>
        </div>
      </div>
    </div>
  );
};
