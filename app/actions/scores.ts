'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface ScoreActionResult {
  error?: string
  success?: boolean
}

export async function addScore(
  scoreValue: number,
  scoreDate: string
): Promise<ScoreActionResult> {
  if (scoreValue < 1 || scoreValue > 45) {
    return { error: 'Score must be between 1 and 45.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Enforce max 5 scores
  const { count } = await supabase
    .from('scores')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if ((count ?? 0) >= 5) {
    return { error: 'You already have 5 scores. Delete one before adding a new score.' }
  }

  const { error } = await supabase
    .from('scores')
    .insert({ user_id: user.id, score_value: scoreValue, score_date: scoreDate })

  if (error) {
    if (error.code === '23505') {
      return { error: 'You already have a score for that date.' }
    }
    return { error: 'Failed to add score. Please try again.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateScore(
  scoreId: string,
  scoreValue: number,
  scoreDate: string
): Promise<ScoreActionResult> {
  if (scoreValue < 1 || scoreValue > 45) {
    return { error: 'Score must be between 1 and 45.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('scores')
    .update({ score_value: scoreValue, score_date: scoreDate })
    .eq('id', scoreId)
    .eq('user_id', user.id)

  if (error) {
    if (error.code === '23505') {
      return { error: 'You already have a score for that date.' }
    }
    return { error: 'Failed to update score. Please try again.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteScore(scoreId: string): Promise<ScoreActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('scores')
    .delete()
    .eq('id', scoreId)
    .eq('user_id', user.id)

  if (error) return { error: 'Failed to delete score. Please try again.' }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function getUserScores(): Promise<{
  id: string
  score_value: number
  score_date: string
}[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('scores')
    .select('id, score_value, score_date')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return data ?? []
}
