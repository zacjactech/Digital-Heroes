import React from 'react';

export const CharityCallout: React.FC = () => {
  return (
    <section className="bg-auth-surface border-l-[3px] border-emerald p-8 md:p-12 mb-24 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 rounded-r-xl">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
          <h3 className="font-heading text-2xl font-bold text-auth-text tracking-tight">Impact the Game</h3>
        </div>
        <p className="font-body text-auth-text-muted text-base leading-relaxed">
          10% of every subscription goes directly to your chosen charity.
        </p>
      </div>

      <div className="flex gap-6 items-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        {[
          { icon: 'nature' },
          { icon: 'groups' },
          { icon: 'school' }
        ].map((item, i) => (
          <div 
            key={i} 
            className="w-16 h-16 bg-auth-surface-hi rounded flex items-center justify-center border border-auth-border"
          >
            <span className="material-symbols-outlined text-3xl text-auth-text-muted">{item.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
