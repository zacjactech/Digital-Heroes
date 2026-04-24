import { createClient } from '@/lib/supabase/server';

/**
 * Handles jackpot rollover if there are no 5-match winners.
 * Calculates 40% of the pool and updates the next draw's carried_over_amount.
 */
export async function handleJackpotRollover(
  drawId: string, 
  totalPool: number, 
  fiveMatchWinnerCount: number
) {
  if (fiveMatchWinnerCount > 0) return { carriedOver: false };

  const supabase = await createClient();
  const carryOverAmount = totalPool * 0.40;

  // 1. Mark current draw as having carried over
  await supabase
    .from('draws')
    .update({ 
      jackpot_carry_forward: carryOverAmount 
    })
    .eq('id', drawId);

  // 2. Find the next draw and add this amount to its starting pool
  const { data: nextDraw } = await supabase
    .from('draws')
    .select('id, jackpot_carry_in')
    .eq('status', 'upcoming')
    .order('draw_date', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (nextDraw) {
    const newCarryIn = (Number(nextDraw.jackpot_carry_in) || 0) + carryOverAmount;
    await supabase
      .from('draws')
      .update({ jackpot_carry_in: newCarryIn })
      .eq('id', nextDraw.id);
  }

  return { carriedOver: true, amount: carryOverAmount };
}
