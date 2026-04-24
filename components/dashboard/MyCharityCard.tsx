'use client'

import React, { useState } from 'react'
import { CharityModal } from './CharityModal'

interface MyCharityCardProps {
  charityId?: string
  charityName?: string
  charityLogo?: string | null
  contributionPercent?: number
  totalContributed?: number
}

export const MyCharityCard: React.FC<MyCharityCardProps> = ({
  charityId,
  charityName = 'None Selected',
  charityLogo,
  contributionPercent = 10,
  totalContributed = 0,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="bg-auth-surface rounded-xl border border-auth-border p-8 relative shadow-xl hover:border-emerald/30 transition-all duration-300">
        <h2 className="font-heading text-sm font-bold text-auth-text-muted mb-6 border-b border-auth-border/30 pb-4 uppercase tracking-[0.2em]">
          My Impact
        </h2>

        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-full bg-forest border border-gold/20 flex items-center justify-center overflow-hidden shadow-inner flex-shrink-0">
            {charityLogo ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={charityLogo} alt={charityName} className="w-full h-full object-cover" />
              </>
            ) : (
              <span className="material-symbols-outlined text-3xl text-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>
                volunteer_activism
              </span>
            )}
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-auth-text leading-none mb-2">
              {charityName}
            </h3>
            <button
              onClick={() => setModalOpen(true)}
              className="font-heading text-[10px] font-bold text-gold hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1 group"
            >
              {charityName === 'None Selected' ? 'Select Charity' : 'Change Charity'}
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="font-body text-xs text-auth-text-muted">Contribution per draw</label>
            <span className="font-mono text-sm font-bold text-auth-text">{contributionPercent}%</span>
          </div>
          <div className="w-full bg-auth-surface-hi rounded-full h-2">
            <div
              className="bg-emerald h-2 rounded-full relative shadow-[0_0_10px_rgba(76,175,130,0.3)] transition-all duration-1000"
              style={{ width: `${Math.max(contributionPercent, 2)}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border border-auth-border" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-auth-border/30">
          <p className="font-body text-[10px] uppercase tracking-widest text-auth-text-muted mb-1">
            Total contributed to date
          </p>
          <p className="font-mono text-3xl font-bold text-emerald tracking-tighter">
            £{totalContributed.toFixed(2)}
          </p>
        </div>
      </div>

      <CharityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentCharityId={charityId}
      />
    </>
  )
}
