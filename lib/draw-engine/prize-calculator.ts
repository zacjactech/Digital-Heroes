/**
 * Prize calculator for Digital Heroes draw engine.
 *
 * Prize Pool Split:
 *   5-match (jackpot) = 40% — rolls over if unclaimed
 *   4-match           = 35%
 *   3-match           = 25%
 *
 * Multiple winners in the same tier split equally.
 * Jackpot carry-forward is stored in draws.jackpot_carry_in.
 */

export interface PrizeTier {
  tier: 'jackpot' | 'second' | 'third'
  matchCount: 5 | 4 | 3
  percentage: number
  winnerCount: number
  totalPrize: number
  perWinnerPrize: number
  isRollover: boolean
}

export interface PrizeBreakdown {
  tiers: PrizeTier[]
  totalPool: number
  jackpotCarryForward: number
}

export function calculatePrizes(params: {
  totalPool: number
  jackpotCarryIn: number
  jackpotWinners: number
  secondWinners: number
  thirdWinners: number
}): PrizeBreakdown {
  const { totalPool, jackpotCarryIn, jackpotWinners, secondWinners, thirdWinners } = params

  const effectivePool = totalPool + jackpotCarryIn

  const jackpotTotal = effectivePool * 0.4
  const secondTotal  = effectivePool * 0.35
  const thirdTotal   = effectivePool * 0.25

  const jackpotIsRollover = jackpotWinners === 0
  const jackpotCarryForward = jackpotIsRollover ? jackpotTotal : 0

  const tiers: PrizeTier[] = [
    {
      tier: 'jackpot',
      matchCount: 5,
      percentage: 40,
      winnerCount: jackpotWinners,
      totalPrize: jackpotTotal,
      perWinnerPrize: jackpotWinners > 0 ? jackpotTotal / jackpotWinners : 0,
      isRollover: jackpotIsRollover,
    },
    {
      tier: 'second',
      matchCount: 4,
      percentage: 35,
      winnerCount: secondWinners,
      totalPrize: secondTotal,
      perWinnerPrize: secondWinners > 0 ? secondTotal / secondWinners : 0,
      isRollover: false,
    },
    {
      tier: 'third',
      matchCount: 3,
      percentage: 25,
      winnerCount: thirdWinners,
      totalPrize: thirdTotal,
      perWinnerPrize: thirdWinners > 0 ? thirdTotal / thirdWinners : 0,
      isRollover: false,
    },
  ]

  return { tiers, totalPool: effectivePool, jackpotCarryForward }
}
