'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Score } from '@/types'

interface UseScoresReturn {
  scores: Score[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useScores(): UseScoresReturn {
  const [scores, setScores] = useState<Score[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchScores = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('scores')
        .select('*')
        .order('score_date', { ascending: false })
        .limit(5)

      if (fetchError) throw new Error(fetchError.message)

      const mapped: Score[] = (data ?? []).map((row: any) => ({
        id:        row.id,
        userId:    row.user_id,
        value:     row.value,
        scoreDate: row.score_date,
        notes:     row.notes ?? undefined,
        createdAt: row.created_at,
      }))

      setScores(mapped)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load scores')
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    void fetchScores()
  }, [fetchScores])

  return { scores, isLoading, error, refetch: fetchScores }
}
