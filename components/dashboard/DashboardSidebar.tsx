'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/scores', label: 'My Scores', icon: 'sports_golf' },
  { href: '/draws', label: 'Draws', icon: 'confirmation_number' },
  { href: '/charities', label: 'Charities', icon: 'volunteer_activism' },
  { href: '/winnings', label: 'Winnings', icon: 'emoji_events' },
];

interface DashboardSidebarProps {
  user?: {
    fullName: string;
    subscriptionStatus: string;
    subscriptionExpires?: string;
  };
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
  const pathname = usePathname();

  const fullName = user?.fullName || 'Member';
  const shortName = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const subscriptionStatus = user?.subscriptionStatus || 'inactive';
  const expiresAt = user?.subscriptionExpires || 'N/A';

  return (
    <nav className="hidden md:flex flex-col h-screen py-8 px-6 fixed left-0 top-0 w-[260px] border-r border-gold/30 bg-forest z-50">
      {/* Logo Area */}
      <div className="mb-10 flex items-center justify-center">
        <Link href="/" className="font-display font-bold italic text-2xl text-gold tracking-tight">
          Digital <span className="text-white">Heroes</span>
        </Link>
      </div>

      {/* User Profile Area */}
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gold/20">
        <div className="w-12 h-12 rounded-full bg-soft-sage/20 border border-gold/30 flex items-center justify-center overflow-hidden">
          <span className="font-heading font-bold text-gold text-sm">{shortName}</span>
        </div>
        <div>
          <p className="font-heading font-bold text-white truncate w-32">{fullName}</p>
          <span className={cn(
            "inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase mt-1",
            subscriptionStatus === 'active' ? "bg-emerald/20 text-emerald" : "bg-red-500/20 text-red-400"
          )}>
            {subscriptionStatus === 'active' ? 'Active Subscriber' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 flex-grow">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300",
                isActive 
                  ? "text-gold border-l-2 border-gold font-bold bg-white/5" 
                  : "text-white/60 font-medium hover:text-white hover:bg-white/5"
              )}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="font-heading text-sm uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
        
        <Link
          href="/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-lg text-white/60 font-medium hover:text-white hover:bg-white/5 transition-all duration-300 mt-auto"
        >
          <span className="material-symbols-outlined text-xl">settings</span>
          <span className="font-heading text-sm uppercase tracking-widest">Settings</span>
        </Link>
      </div>

      {/* Bottom Status */}
      <div className="mt-6 pt-6 border-t border-gold/20">
        <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
          Subscription expires: {expiresAt}
        </p>
        <Link href="/pricing" className="font-heading text-xs font-bold text-gold hover:underline flex items-center gap-2 group">
          Upgrade Plan
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
        <Link 
          href="/dashboard?add_score=true"
          className="mt-4 w-full bg-gold text-forest py-2 px-4 rounded font-heading text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors text-center block"
        >
          New Round
        </Link>
      </div>
    </nav>
  );
};
