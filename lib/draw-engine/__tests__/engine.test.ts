/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { calculateMatch } from '../match-calculator';
import { calculatePrizeTier, distributePrizes } from '../prize-calculator';
import { generateRandomDraw } from '../random';

describe('Draw Engine Unit Tests', () => {
  
  describe('Match Calculator', () => {
    it('should correctly count matches', () => {
      expect(calculateMatch([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(5);
      expect(calculateMatch([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(0);
      expect(calculateMatch([1, 10, 20, 30, 40], [1, 2, 3, 4, 5])).toBe(1);
    });
  });

  describe('Prize Calculator', () => {
    it('should assign correct prize tiers', () => {
      expect(calculatePrizeTier(5)).toBe('jackpot');
      expect(calculatePrizeTier(4)).toBe('second');
      expect(calculatePrizeTier(3)).toBe('third');
      expect(calculatePrizeTier(2)).toBe(null);
    });

    it('should distribute prizes correctly (40/35/25 split)', () => {
      const pool = 1000;
      const winners = { 3: 10, 4: 5, 5: 1 };
      const result = distributePrizes(pool, winners);

      // 25% of 1000 = 250. 250 / 10 = 25
      expect(result.third).toBe(25);
      // 35% of 1000 = 350. 350 / 5 = 70
      expect(result.second).toBe(70);
      // 40% of 1000 = 400. 400 / 1 = 400
      expect(result.jackpot).toBe(400);
    });

    it('should return 0 if no winners in a tier', () => {
      const pool = 1000;
      const winners = { 3: 0, 4: 0, 5: 0 };
      const result = distributePrizes(pool, winners);

      expect(result.third).toBe(0);
      expect(result.second).toBe(0);
      expect(result.jackpot).toBe(0);
    });
  });

  describe('Random Generator', () => {
    it('should generate 5 unique numbers between 1 and 45', () => {
      const draw = generateRandomDraw();
      expect(draw.length).toBe(5);
      const unique = new Set(draw);
      expect(unique.size).toBe(5);
      draw.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(45);
      });
    });
  });
});
