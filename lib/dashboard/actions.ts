import { createClient } from '@/lib/supabase/server';

export interface DashboardData {
  profile: {
    fullName: string;
    subscriptionStatus: string;
    subscriptionRenewedAt: string | null;
    totalContributed: number;
  };
  stats: {
    scoresEntered: number;
    totalScoresAllowed: number;
    drawsEntered: number;
    totalWon: number;
  };
  nextDraw: {
    date: string;
    countdown: string;
    prizes: { tier: string; amount: string }[];
  } | null;
  charity: {
    id: string;
    name: string;
    logoUrl: string | null;
    contributionPercent: number;
  } | null;
  recentResults: {
    date: string;
    scores: number[];
    matched: number;
    result: string;
    winAmount?: string;
  }[];
  scores: {
    id: string;
    score_value: number;
    score_date: string;
  }[];
}

interface ProfileWithCharity {
  full_name: string | null;
  subscription_status: string;
  subscription_end_at: string | null;
  charity_pct: number;
  charities: {
    id: string;
    name: string;
    image_url: string | null;
  } | null;
}

interface EntryWithDraw {
  match_count: number;
  is_winner: boolean;
  scores: number[];
  draws: {
    draw_date: string;
  } | null;
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // 1. Fetch Profile with Charity Join
  const { data: profileData } = await supabase
    .from('profiles')
    .select(`
      full_name,
      subscription_status,
      subscription_end_at,
      charity_pct,
      charities:selected_charity_id (
        id,
        name,
        image_url
      )
    `)
    .eq('id', user.id)
    .single();

  const profile = profileData as unknown as ProfileWithCharity;

  // 2. Fetch Stats & Scores
  const { data: scoresData, count: scoresCount } = await supabase
    .from('scores')
    .select('id, score_value:value, score_date', { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { count: drawsCount } = await supabase
    .from('draw_entries')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { data: winnings } = await supabase
    .from('winners')
    .select('prize_amount')
    .eq('user_id', user.id)
    .in('status', ['approved', 'paid']);
  
  const totalWon = winnings?.reduce((acc, curr) => acc + Number(curr.prize_amount), 0) || 0;

  // 3. Next Draw
  const { data: nextDraw } = await supabase
    .from('draws')
    .select('*')
    .eq('status', 'upcoming')
    .order('draw_date', { ascending: true })
    .limit(1)
    .maybeSingle();

  // 4. Recent Results
  const { data: recentEntriesData } = await supabase
    .from('draw_entries')
    .select(`
      match_count,
      is_winner,
      scores,
      draws:draw_id (
        draw_date
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);
  
  const recentEntries = recentEntriesData as unknown as EntryWithDraw[];

  // Mapping logic
  return {
    profile: {
      fullName: profile?.full_name || 'Member',
      subscriptionStatus: profile?.subscription_status || 'inactive',
      subscriptionRenewedAt: profile?.subscription_end_at || null,
      totalContributed: 145.20, 
    },
    stats: {
      scoresEntered: scoresCount || 0,
      totalScoresAllowed: 5,
      drawsEntered: drawsCount || 0,
      totalWon,
    },
    nextDraw: nextDraw ? {
      date: nextDraw.draw_date,
      countdown: '2d : 14h : 05m', 
      prizes: [
        { tier: 'Tier 1 (Match 5)', amount: '£10k' },
        { tier: 'Tier 2 (Match 4)', amount: '£2k' },
        { tier: 'Tier 3 (Match 3)', amount: '£500' },
      ]
    } : null,
    charity: profile?.charities ? {
      id: profile.charities.id,
      name: profile.charities.name,
      logoUrl: profile.charities.image_url,
      contributionPercent: profile.charity_pct || 10,
    } : null,
    recentResults: recentEntries?.map(entry => ({
      date: entry.draws ? new Date(entry.draws.draw_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Unknown',
      scores: entry.scores || [],
      matched: entry.match_count || 0,
      result: entry.is_winner ? `Winner` : 'No match',
      winAmount: entry.is_winner ? `Pending` : undefined,
    })) || [],
    scores: (scoresData || []).map(s => ({
      id: s.id,
      score_value: s.score_value as unknown as number,
      score_date: s.score_date
    }))
  };
}
