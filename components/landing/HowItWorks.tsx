'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    number: '1',
    title: 'Sign Up & Subscribe',
    description: 'Join the Digital Heroes community. Choose a monthly or yearly plan that fits your goals.',
  },
  {
    number: '2',
    title: 'Log Your Scores',
    description: 'Enter your latest golf scores. We track your rolling 5 most recent rounds automatically.',
  },
  {
    number: '3',
    title: 'Win & Give Back',
    description: 'Enter monthly draws for premium prizes. A portion of every entry goes to your chosen charity.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-mist">
      <div className="container-dh">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl text-forest mb-6"
          >
            How It Works
          </motion.h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center text-center px-4"
            >
              <div className="w-16 h-16 rounded-full bg-gold text-forest flex items-center justify-center font-heading font-bold text-2xl mb-8 shadow-lg shadow-gold/20">
                {step.number}
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-forest mb-4">
                {step.title}
              </h3>
              <p className="font-body text-moss leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector for Desktop */}
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-px border-t border-dashed border-gold/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}