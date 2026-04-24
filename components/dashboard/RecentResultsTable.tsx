'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DrawResult {
  date: string;
  scores: number[];
  matched: number;
  result: string;
  winAmount?: string;
}

interface RecentResultsTableProps {
  results: DrawResult[];
}

export const RecentResultsTable: React.FC<RecentResultsTableProps> = ({ results }) => {
  return (
    <div className="bg-auth-surface rounded-xl border border-auth-border p-6 shadow-xl">
      <h2 className="font-heading text-sm font-bold text-auth-text-muted mb-8 border-b border-auth-border/30 pb-4 uppercase tracking-[0.2em]">
        Recent Results
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-auth-border/20">
              <th className="py-4 px-2 font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted">Draw Date</th>
              <th className="py-4 px-2 font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted">Your Scores</th>
              <th className="py-4 px-2 font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted text-center">Matched</th>
              <th className="py-4 px-2 font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted">Result</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? results.map((res, i) => (
              <tr 
                key={i} 
                className="border-b border-auth-border/10 hover:bg-auth-surface-hi transition-colors duration-300"
              >
                <td className="py-5 px-2 font-body text-sm text-auth-text font-medium">{res.date}</td>
                <td className="py-5 px-2 font-mono text-[13px] text-auth-text-muted">
                  {res.scores.join(', ')}
                </td>
                <td className="py-5 px-2 text-center">
                  <span className={cn(
                    "font-mono text-sm font-bold px-2 py-0.5 rounded",
                    res.matched >= 3 ? "text-gold bg-gold/10" : "text-auth-text-muted"
                  )}>
                    {res.matched}
                  </span>
                </td>
                <td className="py-5 px-2">
                  <span className={cn(
                    "font-heading text-xs font-bold uppercase tracking-widest",
                    res.winAmount ? "text-emerald" : "text-auth-text-muted"
                  )}>
                    {res.result}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-auth-text-muted font-body text-sm">
                  No draw results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <Link 
        href="/draws" 
        className="w-full mt-6 py-3 text-auth-text-muted hover:text-white font-heading text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
      >
        View All History
        <span className="material-symbols-outlined text-sm">open_in_new</span>
      </Link>
    </div>
  );
};
