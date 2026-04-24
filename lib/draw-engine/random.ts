/**
 * Generates 5 unique random numbers between 1 and 45.
 * Returns a sorted array of numbers.
 */
export function generateRandomDraw(): number[] {
  const numbers: Set<number> = new Set();
  
  while (numbers.size < 5) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNum);
  }
  
  return Array.from(numbers).sort((a, b) => a - b);
}
