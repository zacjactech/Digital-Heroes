'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const FLOATING_SCORES = [
  { value: '08', top: '2%', left: '15%', rotate: -15, size: '200px' },
  { value: '72', top: '5%', right: '20%', rotate: 12, size: '250px' },
  { value: '24', bottom: '8%', left: '25%', rotate: 8, size: '180px' },
  { value: '45', bottom: '12%', right: '15%', rotate: -10, size: '300px' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-forest overflow-hidden pt-20">
      {/* Animated Floating Scores */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {FLOATING_SCORES.map((score, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.03,
              y: [0, -30, 0],
              rotate: [score.rotate, score.rotate + 2, score.rotate]
            }}
            transition={{ 
              duration: 12 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 1
            }}
            className="absolute font-mono font-bold text-gold pointer-events-none select-none hidden md:block"
            style={{ 
              top: score.top, 
              left: score.left, 
              right: score.right, 
              bottom: score.bottom,
              fontSize: score.size 
            }}
          >
            {score.value}
          </motion.div>
        ))}
      </div>

      <div className="container-dh relative z-10">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8"
          >
            Play Golf.<br />
            <span className="relative inline-block text-gold leading-normal">
              Change Lives.
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-1 md:-bottom-2 left-0 h-1 md:h-1.5 bg-gold rounded-full" 
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-lg md:text-xl text-soft-sage max-w-2xl mb-12 leading-relaxed"
          >
            Join an exclusive community where your scores translate into charitable impact. 
            Compete in weekly draws, win premium experiences, and support causes that matter.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Button 
              href="/register" 
              size="lg" 
              className="w-full sm:w-auto px-10 shadow-gold"
            >
              Start Subscribing
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Button>
            <Button 
              href="#how-it-works" 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-10 text-white border-white/20 hover:border-gold hover:text-gold"
            >
              How It Works
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest to-transparent" />
    </section>
  )
}