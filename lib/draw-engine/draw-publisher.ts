import { createClient } from '@/lib/supabase/server';
import { calculateMatch } from './match-calculator';
import { distributePrizes } from './prize-calculator';
import { handleJackpotRollover } from './jackpot-handler';

interface Participant {
  id: string;
  scores: { value: number }[];
}

interface DrawEntry {
  draw_id: string;
  user_id: string;
  scores: number[];
  match_count: number;
  is_winner: boolean;
}

/**
 * Publishes a draw by calculating matches for all active subscribers,
 * identifying winners, and distributing prizes.
 */
export async function publishDraw(drawId: string, drawnNumbers: number[]) {
  const supabase = await createClient();

  // 1. Fetch Draw Details
  const { data: draw, error: drawErr } = await supabase
    .from('draws')
    .select('*')
    .eq('id', drawId)
    .single();

  if (drawErr || !draw) throw new Error('Draw not found');
  if (draw.status === 'published') throw new Error('Draw already published');

  const totalPool = Number(draw.prize_pool) + (Number(draw.jackpot_carry_in) || 0);

  // 2. Fetch all active subscribers and their scores
  const { data, error: pErr } = await supabase
    .from('profiles')
    .select('id, scores(value)')
    .eq('subscription_status', 'active');

  if (pErr) throw new Error('Failed to fetch participants');
  const participants = data as unknown as Participant[];

  // 3. Process Entries and Winners
  const entries: DrawEntry[] = [];
  const winnerCounts = { 3: 0, 4: 0, 5: 0 };

  participants.forEach(p => {
    const userScores = p.scores.map(s => s.value);
    const matchCount = calculateMatch(userScores, drawnNumbers);

    entries.push({
      draw_id: drawId,
      user_id: p.id,
      scores: userScores,
      match_count: matchCount,
      is_winner: matchCount >= 3
    });

    if (matchCount >= 3) {
      winnerCounts[matchCount as 3|4|5]++;
    }
  });

  // 4. Calculate Prizes
  const prizeDistribution = distributePrizes(totalPool, winnerCounts);

  // 5. Database Writes
  
  // A. Create Draw Entries
  const { error: entryErr } = await supabase
    .from('draw_entries')
    .insert(entries);
  if (entryErr) throw entryErr;

  // B. Identify and Insert Winners
  const { data: insertedEntries } = await supabase
    .from('draw_entries')
    .select('id, user_id, match_count')
    .eq('draw_id', drawId)
    .gte('match_count', 3);

  if (insertedEntries && insertedEntries.length > 0) {
    const winnersData = insertedEntries.map(e => ({
      user_id: e.user_id,
      draw_id: drawId,
      match_count: e.match_count,
      tier: e.match_count === 5 ? 'jackpot' :
            e.match_count === 4 ? 'second' :
            'third',
      prize_amount: e.match_count === 5 ? prizeDistribution.jackpot :
                    e.match_count === 4 ? prizeDistribution.second :
                    prizeDistribution.third,
      status: 'pending'
    }));

    const { error: winnerErr } = await supabase
      .from('winners')
      .insert(winnersData);
    if (winnerErr) throw winnerErr;
  }

  // C. Update Draw Status
  const { error: finalDrawErr } = await supabase
    .from('draws')
    .update({ 
      drawn_numbers: drawnNumbers,
      status: 'published',
      published_at: new Date().toISOString()
    })
    .eq('id', drawId);
  if (finalDrawErr) throw finalDrawErr;

  // D. Handle Rollover
  await handleJackpotRollover(drawId, totalPool, winnerCounts[5]);

  return {
    success: true,
    winners: insertedEntries?.length || 0,
    prizeDistribution
  };
}
