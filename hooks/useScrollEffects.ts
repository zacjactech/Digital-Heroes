'use client'

import { useEffect, useState, useRef } from 'react'

interface UseParallaxOptions {
  speed?: number
  offset?: number
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, offset = 0 } = options
  const [offsetY, setOffsetY] = useState(0)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return

      const scrollY = window.scrollY

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const elementTop = rect.top + scrollY
        const relativeScroll = scrollY - elementTop
        setOffsetY(relativeScroll * speed + offset)
      } else {
        setOffsetY(scrollY * speed + offset)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, offset])

  return { offsetY, elementRef }
}

export function useScrollReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold])

  return { isVisible, ref }
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const progressValue = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, progressValue)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}