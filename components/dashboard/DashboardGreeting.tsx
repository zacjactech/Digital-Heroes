'use client';

import React from 'react';
import { LiveCountdown } from './LiveCountdown';

interface DashboardGreetingProps {
  name: string;
  nextDrawDate?: string;
}

export const DashboardGreeting: React.FC<DashboardGreetingProps> = ({ name, nextDrawDate }) => {
  const today = new Date().toLocaleDateString('en-GB', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center h-auto md:h-20 w-full mb-10 border-b border-gold/30 pb-6 md:pb-4 gap-4">
      <div className="flex flex-col">
        <h1 className="font-display text-3xl md:text-4xl text-auth-text tracking-tight">
          Good morning, {name}
        </h1>
        <p className="font-body text-auth-text-muted mt-1">{today}</p>
      </div>
      
      <div className="flex items-center gap-6 w-full md:w-auto">
        {nextDrawDate && (
          <div className="flex items-center gap-3 bg-forest border border-gold/30 px-4 py-2 rounded-full">
            <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gold">Next Draw</span>
            <span className="font-mono text-lg font-bold text-white tracking-tighter">
              <LiveCountdown targetDate={nextDrawDate} />
            </span>
          </div>
        )}
        
        <div className="hidden sm:flex gap-4">
          <button className="w-10 h-10 flex items-center justify-center text-auth-text-muted hover:text-gold transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-auth-text-muted hover:text-gold transition-colors">
            <span className="material-symbols-outlined">history</span>
          </button>
        </div>
      </div>
    </header>
  );
};
