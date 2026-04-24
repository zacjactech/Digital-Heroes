'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { deleteScore } from '@/app/actions/scores'
import { ScoreModal } from './ScoreModal'

interface Score {
  id: string
  score_value: number
  score_date: string
}

interface MyScoresCardProps {
  scores: Score[]
}

export const MyScoresCard: React.FC<MyScoresCardProps> = ({ scores }) => {
  const MAX_SCORES = 5
  const searchParams = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Score | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (searchParams.get('add_score') === 'true' && scores.length < MAX_SCORES) {
      setEditTarget(null)
      setModalOpen(true)
      
      // Clear the param without refreshing
      const params = new URLSearchParams(window.location.search)
      params.delete('add_score')
      const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
      window.history.replaceState({}, '', newUrl)
    }
  }, [searchParams, scores.length])

  const openAdd = () => { setEditTarget(null); setModalOpen(true) }
  const openEdit = (score: Score) => { setEditTarget(score); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditTarget(null) }

  const handleDelete = (scoreId: string) => {
    setDeletingId(scoreId)
    setDeleteError('')
    startTransition(async () => {
      const result = await deleteScore(scoreId)
      if (result.error) setDeleteError(result.error)
      setDeletingId(null)
    })
  }

  return (
    <>
      <div className="bg-auth-surface rounded-xl border border-auth-border p-6 shadow-xl">
        <div className="flex justify-between items-center mb-8 border-b border-auth-border/50 pb-4">
          <h2 className="font-heading text-sm font-bold text-auth-text-muted uppercase tracking-[0.2em]">
            Latest Scores
          </h2>
          <button
            onClick={openAdd}
            disabled={scores.length >= MAX_SCORES}
            className={cn(
              'bg-gold text-forest px-4 py-2 rounded font-heading text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 shadow-lg shadow-gold/10',
              scores.length >= MAX_SCORES
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-white'
            )}
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Score
          </button>
        </div>

        {deleteError && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mb-4">
            <span className="material-symbols-outlined text-sm">error</span>
            <p className="font-body text-sm">{deleteError}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-6">
          {scores.map((score) => (
            <div key={score.id} className="group relative">
              <div
                className="w-14 h-14 rounded-lg bg-auth-surface-hi flex items-center justify-center font-mono text-xl font-bold text-auth-text border border-auth-border hover:border-gold/60 transition-all duration-300 cursor-pointer"
                title={`Date: ${score.score_date}`}
              >
                {score.score_value}
              </div>

              {/* Hover actions */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
                <button
                  onClick={() => openEdit(score)}
                  className="w-6 h-6 bg-gold text-forest rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-[12px]">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(score.id)}
                  disabled={deletingId === score.id || isPending}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-400 transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[12px]">
                    {deletingId === score.id ? 'hourglass_empty' : 'close'}
                  </span>
                </button>
              </div>
            </div>
          ))}

          {/* Empty slot */}
          {scores.length < MAX_SCORES && (
            <button
              onClick={openAdd}
              className="w-14 h-14 rounded-lg border-2 border-dashed border-auth-border flex items-center justify-center text-auth-text-muted hover:border-gold hover:text-gold transition-all duration-300"
              title="Add score"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          )}
        </div>

        <p className="font-body text-xs text-auth-text-muted italic">
          {scores.length} of {MAX_SCORES} scores entered
          {scores.length < MAX_SCORES
            ? ` — ${MAX_SCORES - scores.length} slot${MAX_SCORES - scores.length > 1 ? 's' : ''} remaining`
            : ' — ready for the draw!'}
        </p>
      </div>

      <ScoreModal
        isOpen={modalOpen}
        onClose={closeModal}
        editScore={editTarget}
      />
    </>
  )
}
