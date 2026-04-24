'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { getCharities, updateSelectedCharity } from '@/app/actions/charity'

interface Charity {
  id: string
  name: string
  description: string | null
  image_url: string | null
}

interface CharityModalProps {
  isOpen: boolean
  onClose: () => void
  currentCharityId?: string
}

export const CharityModal: React.FC<CharityModalProps> = ({
  isOpen,
  onClose,
  currentCharityId,
}) => {
  const [charities, setCharities] = useState<Charity[]>([])
  const [selected, setSelected] = useState<string>(currentCharityId ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!isOpen) return
    setSelected(currentCharityId ?? '')
    setLoading(true)
    getCharities().then(data => {
      setCharities(data)
      setLoading(false)
    })
  }, [isOpen, currentCharityId])

  const handleSave = () => {
    if (!selected) { setError('Please select a charity.'); return }
    setError('')
    startTransition(async () => {
      const result = await updateSelectedCharity(selected)
      if (result.error) {
        setError(result.error)
      } else {
        onClose()
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-auth-surface border border-auth-border rounded-xl shadow-2xl w-full max-w-lg p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-display text-2xl text-auth-text">Choose Your Charity</h2>
          <button onClick={onClose} className="text-auth-text-muted hover:text-auth-text transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <p className="font-body text-sm text-auth-text-muted mb-8">
          10% of your subscription goes to your chosen charity every month.
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="material-symbols-outlined text-gold animate-spin text-3xl">progress_activity</span>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 mb-6">
            {charities.length === 0 ? (
              <p className="text-auth-text-muted font-body text-sm text-center py-8">
                No charities available yet.
              </p>
            ) : charities.map(charity => (
              <button
                key={charity.id}
                onClick={() => setSelected(charity.id)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200',
                  selected === charity.id
                    ? 'border-gold bg-gold/10'
                    : 'border-auth-border hover:border-auth-text-muted/40 bg-auth-bg'
                )}
              >
                <div className="w-12 h-12 rounded-full bg-forest border border-gold/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {charity.image_url ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={charity.image_url} alt={charity.name} className="w-full h-full object-cover" />
                    </>
                  ) : (
                    <span className="material-symbols-outlined text-xl text-emerald">volunteer_activism</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-auth-text text-sm">{charity.name}</p>
                  {charity.description && (
                    <p className="font-body text-xs text-auth-text-muted truncate mt-0.5">{charity.description}</p>
                  )}
                </div>
                {selected === charity.id && (
                  <span className="material-symbols-outlined text-gold flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mb-4">
            <span className="material-symbols-outlined text-sm">error</span>
            <p className="font-body text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-auth-border rounded-lg font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted hover:border-auth-text-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending || loading}
            className={cn(
              'flex-1 py-3 rounded-lg font-heading text-[10px] font-bold uppercase tracking-widest transition-all duration-300',
              'bg-gold text-forest hover:bg-white',
              (isPending || loading) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isPending ? 'Saving…' : 'Confirm Charity'}
          </button>
        </div>
      </div>
    </div>
  )
}
