'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { GoldDivider } from '@/components/ui/GoldDivider'

interface NavItem {
  href: string
  label: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard',  label: 'Dashboard',  icon: '⊞' },
  { href: '/scores',     label: 'My Scores',  icon: '⛳' },
  { href: '/draws',      label: 'Draws',      icon: '🏆' },
  { href: '/charities',  label: 'Charities',  icon: '♡' },
  { href: '/winnings',   label: 'Winnings',   icon: '★' },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 min-h-dvh bg-forest flex-col">
      {/* Logo */}
      <div className="flex items-center h-20 px-6">
        <Link
          href="/"
          className="font-display font-bold text-xl text-gold hover:opacity-90 transition-opacity"
        >
          Digital <span className="text-white">Heroes</span>
        </Link>
      </div>

      <GoldDivider />

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4 flex-1" aria-label="Dashboard navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl',
                'font-heading font-medium text-[0.9375rem]',
                'transition-all duration-150 min-h-11',
                isActive
                  ? 'bg-gold text-forest font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-base" aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <GoldDivider />

      {/* Profile / Subscription section */}
      <div className="p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-all duration-150 min-h-11"
        >
          <span aria-hidden="true">⚙</span>
          <span className="font-heading font-medium text-[0.9375rem]">Settings</span>
        </Link>
      </div>
    </aside>
  )
}
