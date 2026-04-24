export type PrizeTier = 'third' | 'second' | 'jackpot';

/**
 * Returns the prize tier based on match count.
 * Only 3, 4, or 5 matches are eligible for prizes.
 */
export function calculatePrizeTier(matchCount: number): PrizeTier | null {
  if (matchCount === 5) return 'jackpot';
  if (matchCount === 4) return 'second';
  if (matchCount === 3) return 'third';
  return null;
}

interface WinnerCounts {
  3: number;
  4: number;
  5: number;
}

/**
 * Distributes the total pool across winners based on tiers.
 * 5-match: 40% of pool
 * 4-match: 35% of pool
 * 3-match: 25% of pool
 */
export function distributePrizes(totalPool: number, winnerCounts: WinnerCounts) {
  const thirdMatchPool = totalPool * 0.25;
  const secondMatchPool = totalPool * 0.35;
  const jackpotPool = totalPool * 0.40;

  return {
    third: winnerCounts[3] > 0 ? thirdMatchPool / winnerCounts[3] : 0,
    second: winnerCounts[4] > 0 ? secondMatchPool / winnerCounts[4] : 0,
    jackpot: winnerCounts[5] > 0 ? jackpotPool / winnerCounts[5] : 0,
    pools: {
      third: thirdMatchPool,
      second: secondMatchPool,
      jackpot: jackpotPool
    }
  };
}
