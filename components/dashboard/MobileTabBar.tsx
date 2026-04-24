'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/dashboard', label: 'Home', icon: 'dashboard' },
  { href: '/scores', label: 'Scores', icon: 'sports_golf' },
  { href: '/draws', label: 'Draws', icon: 'confirmation_number' },
  { href: '/charities', label: 'Impact', icon: 'volunteer_activism' },
  { href: '/settings', label: 'More', icon: 'menu' },
];

export const MobileTabBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-forest border-t border-gold/20 flex justify-around items-center h-16 px-4 z-50">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors duration-300",
              isActive ? "text-gold" : "text-white/40"
            )}
          >
            <span className={cn(
              "material-symbols-outlined text-2xl",
              isActive && "fill"
            )}>
              {tab.icon}
            </span>
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
