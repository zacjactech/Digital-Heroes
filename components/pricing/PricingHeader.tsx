import React from 'react';

export const PricingHeader: React.FC = () => {
  return (
    <header className="text-center pt-10 pb-6 md:pt-16 md:pb-10">
      <h1 className="font-display text-5xl md:text-7xl text-auth-text mb-4 tracking-tight">
        Choose Your Plan
      </h1>
      <p className="font-body text-lg md:text-xl text-auth-text-muted max-w-2xl mx-auto px-4">
        Subscribe. Play. Win. Give.
      </p>
    </header>
  );
};
