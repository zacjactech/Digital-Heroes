'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TabItem {
  href: string
  label: string
  icon: string
}

// 5 tabs: Home / Scores / Draw / Charity / Profile
const TABS: TabItem[] = [
  { href: '/dashboard', label: 'Home',     icon: '⊞' },
  { href: '/scores',    label: 'Scores',   icon: '⛳' },
  { href: '/draws',     label: 'Draw',     icon: '🏆' },
  { href: '/charities', label: 'Charity',  icon: '♡' },
  { href: '/winnings',  label: 'Profile',  icon: '★' },
]

export function MobileTabBar() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-sticky bg-forest border-t border-white/10 pb-safe"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch">
        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 py-2',
                'min-h-[56px] transition-colors duration-150',
                isActive ? 'text-gold' : 'text-white/50 hover:text-white/80'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-xl leading-none" aria-hidden="true">{tab.icon}</span>
              <span className="font-heading font-medium text-[10px] uppercase tracking-wide">
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
