/**
 * Generates 5 unique numbers weighted by their frequency in the provided scores.
 * Numbers that appear more often in user scores have a higher chance of being drawn.
 */
export function generateAlgorithmicDraw(allUserScores: number[][]): number[] {
  // 1. Flatten all scores and count frequencies
  const frequencies: Record<number, number> = {};
  
  // Initialize all possible numbers 1-45 with at least a small weight (e.g., 1) 
  // to ensure every number has a non-zero chance even if no one chose it.
  for (let i = 1; i <= 45; i++) {
    frequencies[i] = 1;
  }

  allUserScores.forEach(userScores => {
    userScores.forEach(score => {
      if (score >= 1 && score <= 45) {
        frequencies[score] = (frequencies[score] || 0) + 1;
      }
    });
  });

  // 2. Create a weighted pool or use a selection algorithm
  const drawnNumbers: Set<number> = new Set();
  
  while (drawnNumbers.size < 5) {
    const totalWeight = Object.values(frequencies).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (const [numStr, weight] of Object.entries(frequencies)) {
      const num = parseInt(numStr);
      if (drawnNumbers.has(num)) continue;
      
      random -= weight;
      if (random <= 0) {
        drawnNumbers.add(num);
        break;
      }
    }
  }

  return Array.from(drawnNumbers).sort((a, b) => a - b);
}
