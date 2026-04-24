'use client'

import { motion } from 'framer-motion'

const PRIZES = [
  {
    match: '5-Match',
    title: 'The Jackpot',
    pool: '40%',
    description: 'Match all 5 numbers to claim the ultimate prize. Rolls over if unclaimed.',
    color: 'gold',
  },
  {
    match: '4-Match',
    title: 'Second Tier',
    pool: '35%',
    description: 'Generous payouts for matching 4 out of 5 numbers from your scorecard.',
    color: 'emerald',
  },
  {
    match: '3-Match',
    title: 'Third Tier',
    pool: '25%',
    description: 'Consistent winning opportunities for matching 3 numbers correctly.',
    color: 'moss',
  },
]

export function PrizeTiers() {
  return (
    <section id="prizes" className="py-20 md:py-32 bg-forest text-white overflow-hidden">
      <div className="container-dh">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl mb-6"
            >
              Major Prize <span className="text-gold">Tiers</span>
            </motion.h2>
            <p className="text-soft-sage text-lg leading-relaxed">
              Our prize pool grows with every member. The more heroes join, the bigger 
              the impact and the higher the stakes.
            </p>
          </div>
          <div className="hidden md:block h-px flex-grow bg-white/10 mx-12 mb-6" />
          <div className="font-mono text-gold text-sm uppercase tracking-widest mb-6 whitespace-nowrap">
            Monthly Payouts
          </div>
        </div>

        <div className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory scrollbar-hide">
          {PRIZES.map((prize, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
              className="min-w-[280px] md:min-w-0 snap-center bg-white rounded-2xl p-8 flex flex-col h-full border-l-[6px] border-gold group hover:translate-y-[-8px] transition-all duration-300"
            >
              <div className="font-mono text-gold font-bold text-sm uppercase tracking-widest mb-4">
                {prize.match}
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-forest mb-4">
                {prize.title}
              </h3>
              <div className="font-mono text-4xl font-black text-forest mb-6 flex items-baseline gap-1">
                {prize.pool}
                <span className="text-sm font-medium text-moss">of pool</span>
              </div>
              <p className="text-moss text-sm leading-relaxed flex-grow">
                {prize.description}
              </p>
              
              <div className="mt-8 pt-8 border-t border-soft-sage flex justify-between items-center">
                <span className="material-symbols-outlined text-gold group-hover:translate-x-1 transition-transform">
                  trending_up
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate">
                  Roll-over enabled
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}