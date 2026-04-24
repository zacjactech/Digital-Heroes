/**
 * Draw number generators — random and algorithmic modes.
 *
 * random:       Pure Math.random() lottery from 1–45
 * algorithmic:  Weighted by most/least frequent Stableford scores
 *               across all active users. Admin selects preference.
 */

const SCORE_RANGE = { min: 1, max: 45 }
const DRAW_COUNT = 5

/** Random draw: 5 unique numbers from 1–45 */
export function randomDraw(): number[] {
  const pool = Array.from(
    { length: SCORE_RANGE.max - SCORE_RANGE.min + 1 },
    (_, i) => i + SCORE_RANGE.min
  )
  const result: number[] = []

  while (result.length < DRAW_COUNT) {
    const idx = Math.floor(Math.random() * pool.length)
    const [picked] = pool.splice(idx, 1)
    if (picked !== undefined) result.push(picked)
  }

  return result.sort((a, b) => a - b)
}

/**
 * Algorithmic draw: weighted by score frequency across active users.
 * Higher frequency scores have higher probability of being drawn.
 * @param scoreFrequency - Map of score value → count across all active users
 */
export function algorithmicDraw(scoreFrequency: Map<number, number>): number[] {
  // Build weighted pool
  const weightedPool: number[] = []

  for (let score = SCORE_RANGE.min; score <= SCORE_RANGE.max; score++) {
    const weight = (scoreFrequency.get(score) ?? 0) + 1 // +1 baseline weight
    for (let i = 0; i < weight; i++) {
      weightedPool.push(score)
    }
  }

  const result = new Set<number>()

  while (result.size < DRAW_COUNT && weightedPool.length > 0) {
    const idx = Math.floor(Math.random() * weightedPool.length)
    const picked = weightedPool[idx]
    if (picked !== undefined) result.add(picked)
  }

  return Array.from(result).sort((a, b) => a - b)
}
