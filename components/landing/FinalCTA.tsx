'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  return (
    <section className="py-24 md:py-40 bg-mist relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-dh relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block font-mono text-gold text-xs uppercase tracking-[0.4em] mb-8">
            Ready to become a Hero?
          </span>
          
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-forest mb-10 leading-tight">
            Every score counts. <br />
            Every hero <span className="italic text-gold">wins.</span>
          </h2>
          
          <p className="font-body text-xl text-moss mb-16 max-w-2xl mx-auto leading-relaxed">
            Join thousands of golfers making a difference. 
            Sign up now and get your first entries for the next monthly draw.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button href="/register" size="lg" className="w-full sm:w-auto px-16 h-16 text-lg">
              Join Digital Heroes
              <span className="material-symbols-outlined ml-2">rocket_launch</span>
            </Button>
            <Button href="/pricing" variant="outline" size="lg" className="w-full sm:w-auto px-12 h-16 text-lg border-soft-sage text-forest hover:border-forest hover:bg-forest hover:text-white">
              View Memberships
            </Button>
          </div>
          
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Payment Icons / Trust Badges placeholder */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
              <span className="font-heading font-bold text-sm tracking-widest uppercase">Secured by Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">charity</span>
              <span className="font-heading font-bold text-sm tracking-widest uppercase">Verified Charity</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}