// Central TypeScript interfaces for Digital Heroes
// All database table shapes, API types, and component prop types

// ─── Subscription ──────────────────────────────────────────────────────────────
export type SubscriptionStatus = 'active' | 'inactive' | 'lapsed' | 'cancelled'
export type UserRole = 'member' | 'admin'
export type PricingPlan = 'monthly' | 'yearly'

// ─── Draw ──────────────────────────────────────────────────────────────────────
export type DrawMode = 'random' | 'algorithmic'
export type DrawStatus = 'upcoming' | 'simulation_ready' | 'published'

// ─── Score ─────────────────────────────────────────────────────────────────────
export interface Score {
  id: string
  userId: string
  value: number          // 1–45 Stableford score
  scoreDate: string      // ISO date string YYYY-MM-DD
  notes?: string
  createdAt: string
}

// ─── Profile (extends auth.users) ─────────────────────────────────────────────
export interface Profile {
  id: string              // matches auth.users.id
  email: string
  fullName: string
  avatarUrl?: string
  role: UserRole
  subscriptionStatus: SubscriptionStatus
  stripeCustomerId?: string
  subscriptionRenewedAt?: string
  selectedCharityId?: string
  createdAt: string
}

// ─── Charity ───────────────────────────────────────────────────────────────────
export interface Charity {
  id: string
  name: string
  description: string
  logoUrl?: string
  websiteUrl?: string
  contributionPercent: number  // percentage of pool contributed
  isActive: boolean
  createdAt: string
}

// ─── Draw ──────────────────────────────────────────────────────────────────────
export interface Draw {
  id: string
  name: string
  drawDate: string
  mode: DrawMode
  status: DrawStatus
  drawnNumbers: number[]       // 5 numbers 1–45, empty until published
  prizePool: number
  jackpotCarryIn: number
  jackpotCarryForward: number
  totalEntries: number
  publishedAt?: string
  createdAt: string
}

// ─── Draw Entry ────────────────────────────────────────────────────────────────
export interface DrawEntry {
  id: string
  drawId: string
  userId: string
  scores: number[]           // snapshot of user's 5 scores at draw time
  matchCount: 0 | 1 | 2 | 3 | 4 | 5
  isWinner: boolean
  createdAt: string
}

// ─── Winner ────────────────────────────────────────────────────────────────────
export type WinnerStatus = 'pending' | 'verified' | 'paid' | 'rejected'
export type WinnerTier = 'jackpot' | 'second' | 'third'

export interface Winner {
  id: string
  drawId: string
  userId: string
  tier: WinnerTier
  matchCount: 3 | 4 | 5
  prizeAmount: number
  status: WinnerStatus
  proofUrl?: string
  verifiedAt?: string
  paidAt?: string
  createdAt: string
}

// ─── Subscription Event (audit log) ───────────────────────────────────────────
export interface SubscriptionEvent {
  id: string
  stripeEventId: string
  eventType: string
  payload: Record<string, unknown>
  processedAt: string
}

// ─── API Responses ─────────────────────────────────────────────────────────────
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

// ─── Prize Tier ────────────────────────────────────────────────────────────────
export interface PrizeTierDisplay {
  tier: WinnerTier
  matchCount: 3 | 4 | 5
  percentage: number
  estimatedPrize: number
  label: string
}
