/**
 * computeMatch — core draw matching logic
 * Returns the count of user scores that appear in the drawn numbers.
 * Only 3, 4, or 5 matches qualify for prizes.
 */
export function computeMatch(userScores: number[], drawnNumbers: number[]): number {
  return userScores.filter((score) => drawnNumbers.includes(score)).length
}

export type MatchResult = 0 | 1 | 2 | 3 | 4 | 5

export function isWinningMatch(matchCount: number): matchCount is 3 | 4 | 5 {
  return matchCount >= 3
}

export interface MatchSummary {
  matchCount: MatchResult
  matchedScores: number[]
  isWinner: boolean
  tier: 'jackpot' | 'second' | 'third' | null
}

export function getMatchSummary(
  userScores: number[],
  drawnNumbers: number[]
): MatchSummary {
  const matchedScores = userScores.filter((s) => drawnNumbers.includes(s))
  const matchCount = matchedScores.length as MatchResult
  const isWinner = isWinningMatch(matchCount)

  let tier: MatchSummary['tier'] = null
  if (matchCount === 5) tier = 'jackpot'
  else if (matchCount === 4) tier = 'second'
  else if (matchCount === 3) tier = 'third'

  return { matchCount, matchedScores, isWinner, tier }
}
