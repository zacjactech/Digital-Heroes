'use client'

import { useState } from 'react'
import { PricingHeader } from '@/components/pricing/PricingHeader'
import { BillingToggle } from '@/components/pricing/BillingToggle'
import { PricingCard } from '@/components/pricing/PricingCard'
import { FeatureComparison } from '@/components/pricing/FeatureComparison'
import { CharityCallout } from '@/components/pricing/CharityCallout'
import { TrustBadges } from '@/components/pricing/TrustBadges'
import { PricingFAQ } from '@/components/pricing/PricingFAQ'
import { PRICING_PLANS } from '@/lib/pricing/data'
import { createCheckoutSession } from '@/app/actions/stripe-server'
import { Navbar, Footer } from '@/components/landing'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleCTA = async (planId: string) => {
    const plan = PRICING_PLANS.find(p => p.id === planId)
    if (!plan || !plan.stripePrice) {
      console.error('Invalid plan or missing price ID')
      return
    }

    setLoadingPlan(planId)
    try {
      // In a real app, we would get the userId from auth session
      const url = await createCheckoutSession('dummy-user-id', plan.stripePrice, window.location.origin)
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-auth-bg min-h-screen">
        {/* Spacer for fixed navbar */}
        <div className="h-16 md:h-20" />

        <div className="container-dh mx-auto px-6 py-12">
          <PricingHeader />
          
          <BillingToggle 
            billingCycle={billingCycle} 
            setBillingCycle={setBillingCycle} 
          />
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-32">
            {PRICING_PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                {...plan}
                isLoading={loadingPlan === plan.id}
                onCTA={() => handleCTA(plan.id)}
              />
            ))}
          </section>

          <div className="max-w-5xl mx-auto">
            <FeatureComparison />
            <CharityCallout />
            <PricingFAQ />
            <TrustBadges />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
