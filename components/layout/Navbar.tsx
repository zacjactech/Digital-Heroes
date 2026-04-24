import Link from 'next/link'
import { GoldDivider } from '@/components/ui/GoldDivider'

const NAV_LINKS = [
  { href: '/charities', label: 'Charities' },
  { href: '/draws',     label: 'Draw Results' },
  { href: '/pricing',   label: 'Pricing' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-forest/95 backdrop-blur-md">
      <div className="container-dh flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-xl text-gold tracking-tight hover:opacity-90 transition-opacity"
          aria-label="Digital Heroes — Home"
        >
          Digital <span className="text-white">Heroes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading font-medium text-[0.9375rem] text-white/80 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:flex font-heading font-semibold text-sm text-white/80 hover:text-gold transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="btn-primary text-sm px-5 h-10"
          >
            Join Now
          </Link>
        </div>
      </div>
      <GoldDivider />
    </header>
  )
}
