'use client';

import React from 'react';
import Link from 'next/link';
import { LiveCountdown } from './LiveCountdown';

interface NextDrawCardProps {
  date?: string;
  prizes?: { tier: string; amount: string }[];
}

export const NextDrawCard: React.FC<NextDrawCardProps> = ({ 
  date, 
  prizes = [] 
}) => {
  return (
    <div className="bg-forest rounded-xl border border-gold/30 p-8 relative overflow-hidden shadow-2xl group">
      {/* Decorative Glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gold/5 rounded-full blur-[80px] group-hover:bg-gold/10 transition-all duration-700"></div>
      
      <h2 className="font-heading text-sm font-bold text-auth-text-muted mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
        <span className="material-symbols-outlined text-gold" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
        Next Draw
      </h2>

      <div className="text-center mb-10">
        <p className="font-mono text-4xl md:text-5xl font-bold text-gold tracking-tight drop-shadow-sm">
          {date ? <LiveCountdown targetDate={date} /> : 'Draw in progress...'}
        </p>
      </div>

      <div className="space-y-4 border-t border-gold/10 pt-8">
        <h3 className="font-heading text-[10px] font-bold text-auth-text-muted mb-4 uppercase tracking-widest">
          Estimated Prize Pool
        </h3>
        
        {prizes.length > 0 ? prizes.map((prize, i) => (
          <div key={i} className="flex justify-between items-center py-1">
            <span className="font-body text-sm text-auth-text/70">{prize.tier}</span>
            <span className="font-mono text-base font-bold text-gold">{prize.amount}</span>
          </div>
        )) : (
          <p className="text-auth-text-muted font-body text-xs">Prizes will be announced shortly.</p>
        )}
      </div>
      
      <Link href="/draws" className="mt-8 w-full flex items-center justify-center py-3 border border-gold/30 rounded font-heading text-[10px] font-bold uppercase tracking-widest text-gold hover:bg-gold/10 transition-all duration-300">
        View Prize Rules
      </Link>
    </div>
  );
};
