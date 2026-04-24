/**
 * Calculates how many numbers in userScores match the drawnNumbers.
 */
export function calculateMatch(userScores: number[], drawnNumbers: number[]): number {
  const drawnSet = new Set(drawnNumbers);
  return userScores.filter(score => drawnSet.has(score)).length;
}
