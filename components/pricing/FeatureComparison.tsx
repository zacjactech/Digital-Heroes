import React from 'react';
import { FEATURES_COMPARISON } from '@/lib/pricing/data';
import { cn } from '@/lib/utils';

export const FeatureComparison: React.FC = () => {
  return (
    <section className="mt-32 mb-32 overflow-hidden rounded-xl border border-auth-border bg-auth-surface shadow-2xl">
      <div className="bg-forest p-8 border-b border-gold/20">
        <h2 className="font-heading text-2xl font-bold text-gold text-center tracking-tight">Compare All Features</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-auth-surface-hi/50">
              <th className="p-6 font-heading font-bold text-auth-text border-b border-auth-border">Feature</th>
              <th className="p-6 font-heading font-bold text-center text-auth-text border-b border-auth-border">Monthly</th>
              <th className="p-6 font-heading font-bold text-center text-gold border-b border-auth-border">Yearly</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES_COMPARISON.map((feature, idx) => (
              <tr 
                key={idx} 
                className={cn(
                  "transition-colors hover:bg-gold/5",
                  idx % 2 === 0 ? "bg-transparent" : "bg-auth-surface-hi/20"
                )}
              >
                <td className="p-6 font-body text-base text-auth-text border-b border-auth-border/50">
                  {feature.name}
                </td>
                <td className="p-6 text-center border-b border-auth-border/50">
                  {feature.monthly ? (
                    <span className="material-symbols-outlined text-emerald text-xl">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-auth-text-muted/40 text-xl">close</span>
                  )}
                </td>
                <td className="p-6 text-center border-b border-auth-border/50">
                  {feature.yearly ? (
                    <span className="material-symbols-outlined text-gold text-xl">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-auth-text-muted/40 text-xl">close</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
