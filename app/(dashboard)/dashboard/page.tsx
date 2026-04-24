import React from 'react'
import {
  DashboardGreeting,
  KPICards,
  MyScoresCard,
  NextDrawCard,
  MyCharityCard,
  RecentResultsTable
} from '@/components/dashboard'
import { getDashboardData } from '@/lib/dashboard/actions'

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DashboardGreeting 
        name={data.profile.fullName.split(' ')[0] || 'Member'} 
        nextDrawDate={data.nextDraw?.date}
      />
      
      <KPICards 
        subscriptionStatus={data.profile.subscriptionStatus}
        renewalDate={data.profile.subscriptionRenewedAt ? new Date(data.profile.subscriptionRenewedAt).toLocaleDateString('en-GB') : undefined}
        scoresEntered={data.stats.scoresEntered}
        totalScoresAllowed={data.stats.totalScoresAllowed}
        drawsEntered={data.stats.drawsEntered}
        totalWon={data.stats.totalWon}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Scores & Results */}
        <div className="lg:col-span-2 space-y-8">
          <MyScoresCard scores={data.scores} />
          <RecentResultsTable results={data.recentResults} />
        </div>
        
        {/* Right Column: Draw Info & Charity */}
        <div className="space-y-8">
          <NextDrawCard 
            date={data.nextDraw?.date}
            prizes={data.nextDraw?.prizes}
          />
          <MyCharityCard 
            charityName={data.charity?.name}
            charityLogo={data.charity?.logoUrl}
            contributionPercent={data.charity?.contributionPercent}
            totalContributed={data.profile.totalContributed}
          />
        </div>
      </div>
    </div>
  )
}
