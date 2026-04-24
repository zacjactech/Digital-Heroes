import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { publishDraw } from '@/lib/draw-engine/draw-publisher';
import { generateRandomDraw } from '@/lib/draw-engine/random';
import { generateAlgorithmicDraw } from '@/lib/draw-engine/algorithmic';

interface Participant {
  scores: { value: number }[];
}

/**
 * POST /api/admin/draws/publish
 * Triggers the publication of a draw.
 * Body: { drawId: string, type: 'random' | 'algorithmic' | 'manual', manualNumbers?: number[] }
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Authorization Check (Admin only)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 2. Parse Body
    const { drawId, type, manualNumbers } = await req.json();

    if (!drawId) {
      return NextResponse.json({ error: 'Draw ID is required' }, { status: 400 });
    }

    // 3. Determine Drawn Numbers
    let drawnNumbers: number[] = [];

    if (type === 'manual' && manualNumbers && manualNumbers.length === 5) {
      drawnNumbers = manualNumbers.sort((a: number, b: number) => a - b);
    } else if (type === 'algorithmic') {
      // Fetch scores for algorithmic draw
      const { data, error: pErr } = await supabase
        .from('profiles')
        .select('scores(value)')
        .eq('subscription_status', 'active');
      
      if (pErr) throw pErr;
      const participants = data as unknown as Participant[];
      
      const allScores: number[][] = participants.map(p => 
        p.scores.map(s => s.value)
      );
      drawnNumbers = generateAlgorithmicDraw(allScores);
    } else {
      drawnNumbers = generateRandomDraw();
    }

    // 4. Publish
    const result = await publishDraw(drawId, drawnNumbers);

    return NextResponse.json({
      success: true,
      drawnNumbers,
      winners: result.winners,
      prizeDistribution: result.prizeDistribution
    });

  } catch (error: unknown) {
    console.error('Draw Publication Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal Server Error' 
    }, { status: 500 });
  }
}
