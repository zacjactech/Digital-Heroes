import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Format a number as GBP currency */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount)
}

/** Format a date string as UK locale */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Format a short date (DD MMM YYYY) */
export function formatShortDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Get today's date as YYYY-MM-DD string */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0]!
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Type-safe API response builder */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

export function apiSuccess<T>(data: T): ApiResponse<T> {
  return { success: true, data }
}

export function apiError(error: string, code?: string): ApiResponse<never> {
  return { success: false, error, code }
}
