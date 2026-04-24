import { createClient } from '@/lib/supabase/server';
import { generateRandomDraw } from './random';
import { generateAlgorithmicDraw } from './algorithmic';
import { calculateMatch } from './match-calculator';
import { distributePrizes } from './prize-calculator';

export interface SimulationResult {
  drawnNumbers: number[];
  stats: {
    totalParticipants: number;
    zeroMatch: number;
    oneMatch: number;
    twoMatch: number;
    threeMatch: number;
    fourMatch: number;
    fiveMatch: number;
  };
  prizeEstimates: {
    totalPool: number;
    third: number;
    second: number;
    jackpot: number;
  };
}

interface Participant {
  id: string;
  scores: { value: number }[];
}

/**
 * Simulates a draw for the given configuration.
 * Fetches all active subscriber scores and calculates match statistics.
 */
export async function simulateDraw(
  drawConfig: { type: 'random' | 'algorithmic'; totalPool: number }
): Promise<SimulationResult> {
  const supabase = await createClient();

  // 1. Fetch all active subscriber scores
  const { data, error: pErr } = await supabase
    .from('profiles')
    .select('id, scores(value)')
    .eq('subscription_status', 'active');

  if (pErr) throw new Error('Failed to fetch participants');
  const participants = data as unknown as Participant[];

  const allScores: number[][] = participants.map(p => 
    p.scores.map(s => s.value)
  );

  // 2. Generate drawn numbers
  const drawnNumbers = drawConfig.type === 'algorithmic' 
    ? generateAlgorithmicDraw(allScores)
    : generateRandomDraw();

  // 3. Calculate match stats
  const stats = {
    totalParticipants: allScores.length,
    zeroMatch: 0,
    oneMatch: 0,
    twoMatch: 0,
    threeMatch: 0,
    fourMatch: 0,
    fiveMatch: 0
  };

  allScores.forEach(scores => {
    const matches = calculateMatch(scores, drawnNumbers);
    if (matches === 0) stats.zeroMatch++;
    else if (matches === 1) stats.oneMatch++;
    else if (matches === 2) stats.twoMatch++;
    else if (matches === 3) stats.threeMatch++;
    else if (matches === 4) stats.fourMatch++;
    else if (matches === 5) stats.fiveMatch++;
  });

  // 4. Calculate prize estimates
  const prizes = distributePrizes(drawConfig.totalPool, {
    3: stats.threeMatch,
    4: stats.fourMatch,
    5: stats.fiveMatch
  });

  return {
    drawnNumbers,
    stats,
    prizeEstimates: {
      totalPool: drawConfig.totalPool,
      third: prizes.third,
      second: prizes.second,
      jackpot: prizes.jackpot
    }
  };
}
