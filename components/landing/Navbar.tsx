'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/draws', label: 'Draws' },
  { href: '#prizes', label: 'Prizes' },
  { href: '/charities', label: 'Impact' },
  { href: '/pricing', label: 'Membership' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container-dh flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-xl md:text-2xl italic text-gold tracking-tight hover:opacity-90 transition-opacity"
        >
          Digital <span className="text-white">Heroes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading font-medium text-[0.875rem] uppercase tracking-widest text-white/70 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:block font-heading font-semibold text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Button
            href="/register"
            size="sm"
            className="text-[10px] md:text-xs uppercase tracking-tighter md:tracking-widest px-4 md:px-6"
          >
            Subscribe Now
          </Button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-forest border-t border-gold/20"
          >
            <div className="container-dh py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-heading font-bold text-lg text-white/80 hover:text-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/10" />
              <Link
                href="/login"
                className="font-heading font-bold text-lg text-white/80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GoldDivider className={isScrolled ? 'opacity-30' : 'opacity-0'} />
    </header>
  )
}