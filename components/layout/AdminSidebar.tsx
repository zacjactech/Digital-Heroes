'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { GoldDivider } from '@/components/ui/GoldDivider'

interface AdminNavItem {
  href: string
  label: string
  icon: string
}

const ADMIN_NAV: AdminNavItem[] = [
  { href: '/admin',            label: 'Dashboard',  icon: '⊞' },
  { href: '/admin/users',      label: 'Members',    icon: '👥' },
  { href: '/admin/draws',      label: 'Draws',      icon: '🎲' },
  { href: '/admin/charities',  label: 'Charities',  icon: '♡' },
  { href: '/admin/winners',    label: 'Winners',    icon: '🏆' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 min-h-dvh bg-ink flex-col">
      {/* Logo */}
      <div className="flex flex-col h-20 px-6 justify-center">
        <p className="font-display font-bold text-base text-gold">Digital Heroes</p>
        <p className="font-heading font-semibold text-xs text-slate uppercase tracking-wider mt-0.5">
          Admin Panel
        </p>
      </div>

      <GoldDivider />

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4 flex-1" aria-label="Admin navigation">
        {ADMIN_NAV.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl',
                'font-heading font-medium text-[0.9375rem]',
                'transition-all duration-150 min-h-11',
                isActive
                  ? 'bg-gold/15 text-gold font-semibold border border-gold/20'
                  : 'text-slate hover:bg-white/5 hover:text-white'
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

      <div className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate hover:text-white hover:bg-white/5 transition-all min-h-11"
        >
          <span aria-hidden="true">←</span>
          <span className="font-heading font-medium text-[0.9375rem]">Member View</span>
        </Link>
      </div>
    </aside>
  )
}
