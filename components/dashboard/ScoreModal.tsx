'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { addScore, updateScore } from '@/app/actions/scores'

interface ScoreModalProps {
  isOpen: boolean
  onClose: () => void
  editScore?: { id: string; score_value: number; score_date: string } | null
}

export const ScoreModal: React.FC<ScoreModalProps> = ({ isOpen, onClose, editScore }) => {
  const [scoreValue, setScoreValue] = useState('')
  const [scoreDate, setScoreDate] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const isEditing = !!editScore

  useEffect(() => {
    if (editScore) {
      setScoreValue(String(editScore.score_value))
      setScoreDate(editScore.score_date)
    } else {
      setScoreValue('')
      setScoreDate(new Date().toISOString().split('T')[0] || '')
    }
    setError('')
  }, [editScore, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = parseInt(scoreValue, 10)
    if (isNaN(value)) { setError('Please enter a valid score.'); return }
    setError('')

    startTransition(async () => {
      const result = isEditing
        ? await updateScore(editScore!.id, value, scoreDate)
        : await addScore(value, scoreDate)

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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-auth-surface border border-auth-border rounded-xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-2xl text-auth-text">
            {isEditing ? 'Edit Score' : 'Add Score'}
          </h2>
          <button
            onClick={onClose}
            className="text-auth-text-muted hover:text-auth-text transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Score Value */}
          <div>
            <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted mb-2 block">
              Stableford Score
            </label>
            <input
              type="number"
              min={1}
              max={45}
              value={scoreValue}
              onChange={e => setScoreValue(e.target.value)}
              placeholder="e.g. 36"
              required
              className="w-full bg-auth-bg border border-auth-border rounded-lg px-4 py-3 font-mono text-2xl font-bold text-gold text-center tracking-widest focus:outline-none focus:border-gold transition-colors placeholder:text-auth-text-muted/40"
            />
            <p className="font-body text-xs text-auth-text-muted mt-2">
              Stableford points (1–45)
            </p>
          </div>

          {/* Date */}
          <div>
            <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted mb-2 block">
              Round Date
            </label>
            <input
              type="date"
              value={scoreDate}
              onChange={e => setScoreDate(e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full bg-auth-bg border border-auth-border rounded-lg px-4 py-3 font-body text-auth-text focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              <span className="material-symbols-outlined text-sm">error</span>
              <p className="font-body text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-auth-border rounded-lg font-heading text-[10px] font-bold uppercase tracking-widest text-auth-text-muted hover:border-auth-text-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                'flex-1 py-3 rounded-lg font-heading text-[10px] font-bold uppercase tracking-widest transition-all duration-300',
                'bg-gold text-forest hover:bg-white',
                isPending && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isPending ? 'Saving…' : isEditing ? 'Update Score' : 'Add Score'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
