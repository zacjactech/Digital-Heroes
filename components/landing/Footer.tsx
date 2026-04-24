'use client'

import Link from 'next/link'


const FOOTER_LINKS = [
  {
    title: 'Platform',
    links: [
      { label: 'How it Works', href: '/#how-it-works' },
      { label: 'Draw Results', href: '/draws' },
      { label: 'Charities', href: '/charities' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partnerships', href: '/partners' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Draw Rules', href: '/rules' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-forest text-white pt-24 pb-12 border-t border-white/5">
      <div className="container-dh">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4 max-w-sm">
            <Link 
              href="/" 
              className="font-display font-bold text-3xl italic text-gold tracking-tight mb-8 block"
            >
              Digital <span className="text-white">Heroes</span>
            </Link>
            <p className="text-soft-sage text-lg leading-relaxed mb-10">
              The premier golf subscription platform. Bridging the gap between
              passion on the green and impact in our communities.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <Link 
                  key={social} 
                  href={`#${social}`} 
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-forest transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-xl opacity-60 group-hover:opacity-100">
                    public
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {FOOTER_LINKS.map((group) => (
                <div key={group.title}>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-gold mb-8">
                    {group.title}
                  </h4>
                  <ul className="space-y-4">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href} 
                          className="text-white/60 hover:text-white transition-colors font-body text-[15px]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/40 font-body text-sm">
            © {new Date().getFullYear()} Digital Heroes Limited. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/stripe-badge-white.svg" alt="Stripe" className="h-6 opacity-40 hover:opacity-100 transition-opacity" />
            <div className="h-4 w-px bg-white/10" />
            <div className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
              Built with Heart
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}