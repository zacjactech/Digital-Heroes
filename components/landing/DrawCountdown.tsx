'use client'

import { motion } from 'framer-motion'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { Button } from '@/components/ui/Button'

export function DrawCountdown() {
  // Static end date for visual demo - ideally would come from DB
  const nextDrawDate = new Date()
  nextDrawDate.setDate(nextDrawDate.getDate() + 4)
  nextDrawDate.setHours(20, 0, 0, 0)

  return (
    <section className="py-20 bg-forest relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)]" />
      </div>

      <div className="container-dh relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 lg:p-20 shadow-2xl shadow-black/40 overflow-hidden relative">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-[100%]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold rounded-full font-mono text-[10px] uppercase tracking-widest mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                </span>
                Next Draw Countdown
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.1, ease: "easeOut" }}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-forest mb-6"
              >
                Your shot at the <br />
                <span className="text-gold italic">£1,250 Jackpot.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-body text-lg text-moss mb-10 max-w-lg"
              >
                Entries close soon. Don&apos;t miss your chance to turn your weekend round 
                into a winning moment.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button href="/register" size="lg" className="w-full sm:w-auto px-12">
                  Get My Entry
                </Button>
              </motion.div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-md"
              >
                <CountdownTimer targetDate={nextDrawDate} />
                
                <div className="mt-8 flex items-center justify-center gap-4 text-slate font-mono text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                    Secure
                  </div>
                  <div className="w-px h-3 bg-soft-sage" />
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                    Verified
                  </div>
                  <div className="w-px h-3 bg-soft-sage" />
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                    Transparent
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}