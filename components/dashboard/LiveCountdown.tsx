'use client'

import React, { useState, useEffect } from 'react'

export const LiveCountdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft('00h : 00m : 00s')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeLeft(`${days}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m`)
      } else {
        setTimeLeft(`${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`)
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) return <span>-- : -- : --</span>
  return <span>{timeLeft}</span>
}
