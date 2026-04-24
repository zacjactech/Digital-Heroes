'use client';

import React, { useState } from 'react';
import { FAQS } from '@/lib/pricing/data';
import { cn } from '@/lib/utils';

export const PricingFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-3xl mx-auto py-24 px-6">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl text-forest mb-4">Frequently Asked Questions</h2>
        <p className="font-body text-moss">Everything you need to know about our plans and participation.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={cn(
                "border-b border-soft-sage transition-all duration-300 pb-4",
                isOpen ? "border-gold" : "hover:border-moss/30"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-center py-4 text-left group"
              >
                <span className={cn(
                  "font-heading font-bold transition-colors duration-300",
                  isOpen ? "text-forest" : "text-moss group-hover:text-forest"
                )}>
                  {faq.question}
                </span>
                <span className={cn(
                  "material-symbols-outlined transition-transform duration-300",
                  isOpen ? "rotate-180 text-gold" : "text-moss"
                )}>
                  {isOpen ? 'remove' : 'add'}
                </span>
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                )}
              >
                <p className="font-body text-sm text-moss leading-relaxed pb-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
