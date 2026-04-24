'use client'

import { useEffect, useState, useCallback } from 'react'

interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

function getTimeRemaining(targetDate: Date): CountdownState {
  const now = Date.now()
  const target = targetDate.getTime()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days    = Math.floor(totalSeconds / 86400)
  const hours   = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isExpired: false }
}

/**
 * useCountdown — real-time countdown to a target date
 * Updates every second. Stops when expired.
 */
export function useCountdown(targetDate: Date | string): CountdownState {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate

  const [state, setState] = useState<CountdownState>(() => getTimeRemaining(target))

  const tick = useCallback(() => {
    setState(getTimeRemaining(target))
  }, [target])

  useEffect(() => {
    if (state.isExpired) return

    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick, state.isExpired])

  return state
}
