import Link from 'next/link'
import { GoldDivider } from '@/components/ui/GoldDivider'

const FOOTER_LINKS = {
  Platform: [
    { href: '/charities',  label: 'Charities' },
    { href: '/draws',      label: 'Draw Results' },
    { href: '/pricing',    label: 'Pricing' },
    { href: '/register',   label: 'Join Now' },
  ],
  Support: [
    { href: '/faq',        label: 'FAQ' },
    { href: '/contact',    label: 'Contact Us' },
    { href: '/terms',      label: 'Terms of Service' },
    { href: '/privacy',    label: 'Privacy Policy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-forest text-white/70">
      <GoldDivider />
      <div className="container-dh py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <p className="font-display font-bold text-xl text-gold">
              Digital Heroes
            </p>
            <p className="font-body text-sm leading-relaxed text-white/60 max-w-xs">
              Golf. Charity. Prize Draws. Play your best game and support causes that matter.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-gold">
                {section}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} Digital Heroes Club. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Registered in England & Wales
          </p>
        </div>
      </div>
    </footer>
  )
}
