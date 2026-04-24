'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function CharitySpotlight() {
  return (
    <section className="py-20 md:py-32 bg-mist overflow-hidden">
      <div className="container-dh">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="/images/charity-focus.jpg" 
                alt="Giving back through golf" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating Stat Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-[240px] hidden md:block"
            >
              <div className="font-mono text-4xl font-black text-gold mb-2">£45k+</div>
              <div className="font-heading font-bold text-sm text-forest uppercase tracking-widest leading-tight">
                Raised for Local Charities this year
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="relative">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block font-mono text-gold text-xs uppercase tracking-[0.3em] mb-6"
            >
              Impact Spotlight
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-forest mb-8 leading-[1.1]"
            >
              Your passion for golf, <br />
              <span className="italic text-emerald">their hope</span> for the future.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className="font-body text-lg text-moss mb-10 leading-relaxed"
            >
Digital Heroes is built on the belief that competition should serve a greater 
              purpose. Every subscription supports carefully vetted charities, with 
              over £100,000 targeted for distribution this year.
            </motion.p>

            <div className="space-y-6 mb-12">
              {[
                'Direct impact on local causes',
                'Transparent distribution of funds',
                'Community-led charity selection',
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-4 text-forest font-heading font-semibold"
                >
                  <span className="material-symbols-outlined text-emerald text-2xl">check_circle</span>
                  {item}
                </motion.div>
              ))}
            </div>

            <Button href="/charities" variant="outline" size="lg">
              Explore Our Charities
              <span className="material-symbols-outlined ml-2">diversity_1</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}