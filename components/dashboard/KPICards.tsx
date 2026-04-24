'use client';

import React from 'react';

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  progress?: number; // 0-100
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, subtext, progress }) => (
  <div className="bg-auth-surface rounded-xl border border-auth-border p-6 flex flex-col justify-between hover:border-gold/50 transition-all duration-300 group">
    <h3 className="font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted mb-4 group-hover:text-gold transition-colors">
      {label}
    </h3>
    
    <div className="mb-2">
      <span className="font-mono text-3xl font-bold text-auth-text tracking-tighter">
        {value}
      </span>
    </div>

    {progress !== undefined ? (
      <div className="w-full bg-auth-surface-hi rounded-full h-1.5 mb-1 mt-2">
        <div 
          className="bg-emerald h-1.5 rounded-full shadow-[0_0_8px_rgba(76,175,130,0.5)] transition-all duration-1000" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    ) : null}

    {subtext && (
      <p className="font-body text-xs text-auth-text-muted mt-1">{subtext}</p>
    )}
  </div>
);

interface KPICardsProps {
  subscriptionStatus: string;
  renewalDate?: string;
  scoresEntered: number;
  totalScoresAllowed: number;
  drawsEntered: number;
  totalWon: number;
}

export const KPICards: React.FC<KPICardsProps> = ({
  subscriptionStatus,
  renewalDate,
  scoresEntered,
  totalScoresAllowed,
  drawsEntered,
  totalWon
}) => {
  const scoreProgress = (scoresEntered / totalScoresAllowed) * 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <KPICard 
        label="Subscription" 
        value={subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)} 
        subtext={renewalDate ? `Renewal: ${renewalDate}` : 'No active renewal'} 
      />
      <KPICard 
        label="Scores Entered" 
        value={`${scoresEntered} of ${totalScoresAllowed}`} 
        progress={scoreProgress} 
        subtext={`${totalScoresAllowed - scoresEntered} remaining`}
      />
      <KPICard 
        label="Draws Entered" 
        value={drawsEntered} 
        subtext="All-time history"
      />
      <KPICard 
        label="Total Won" 
        value={`£${totalWon.toFixed(2)}`} 
        subtext="Paid to date"
      />
    </div>
  );
};
