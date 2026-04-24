'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Draw, DrawMode, DrawStatus } from '@/types'

interface UseDrawsReturn {
  draws: Draw[]
  nextDraw: Draw | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useDraws(): UseDrawsReturn {
  const [draws, setDraws] = useState<Draw[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchDraws = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('draws')
        .select('*')
        .order('draw_date', { ascending: false })
        .limit(10)

      if (fetchError) throw new Error(fetchError.message)

      const mapped: Draw[] = (data ?? []).map((row: any) => ({
        id:                   row.id,
        name:                 row.name,
        drawDate:             row.draw_date,
        mode:                 row.mode as DrawMode,
        status:               row.status as DrawStatus,
        drawnNumbers:         row.drawn_numbers ?? [],
        prizePool:            Number(row.prize_pool),
        jackpotCarryIn:       Number(row.jackpot_carry_in),
        jackpotCarryForward:  Number(row.jackpot_carry_forward),
        totalEntries:         row.total_entries,
        publishedAt:          row.published_at ?? undefined,
        createdAt:            row.created_at,
      }))

      setDraws(mapped)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load draws')
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    void fetchDraws()
  }, [fetchDraws])

  const nextDraw = draws.find((d) => d.status === 'upcoming') ?? null

  return { draws, nextDraw, isLoading, error, refetch: fetchDraws }
}
