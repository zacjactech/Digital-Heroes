import React from 'react';

export const TrustBadges: React.FC = () => {
  const badges = [
    { icon: 'shield_lock', text: 'Secure Payments by Stripe' },
    { icon: 'verified_user', text: 'SSL Encrypted Checkout' },
    { icon: 'history', text: '30-Day History Tracking' },
    { icon: 'support_agent', text: 'Priority Member Support' }
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 py-12 border-t border-soft-sage/50">
      {badges.map((badge, i) => (
        <div key={i} className="flex items-center gap-3 group">
          <span className="material-symbols-outlined text-slate group-hover:text-gold transition-colors duration-300">
            {badge.icon}
          </span>
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-slate/80 group-hover:text-forest transition-colors duration-300">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
};
