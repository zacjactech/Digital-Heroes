export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          stripe_customer_id: string | null
          subscription_status: 'active' | 'inactive' | 'lapsed' | 'cancelled'
          subscription_plan: 'monthly' | 'yearly' | null
          subscription_end_at: string | null
          charity_id: string | null
          charity_pct: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'lapsed' | 'cancelled'
          subscription_plan?: 'monthly' | 'yearly' | null
          subscription_end_at?: string | null
          charity_id?: string | null
          charity_pct?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'lapsed' | 'cancelled'
          subscription_plan?: 'monthly' | 'yearly' | null
          subscription_end_at?: string | null
          charity_id?: string | null
          charity_pct?: number
          created_at?: string
          updated_at?: string
        }
      }
      scores: {
        Row: {
          id: string
          user_id: string
          score_value: number
          score_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          score_value: number
          score_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          score_value?: number
          score_date?: string
          created_at?: string
        }
      }
      charities: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      charity_events: {
        Row: {
          id: string
          charity_id: string
          event_name: string
          event_date: string
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          charity_id: string
          event_name: string
          event_date: string
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          charity_id?: string
          event_name?: string
          event_date?: string
          location?: string | null
          created_at?: string
        }
      }
      draws: {
        Row: {
          id: string
          draw_date: string
          draw_type: 'random' | 'algorithmic'
          drawn_numbers: number[] | null
          status: 'draft' | 'simulated' | 'published'
          jackpot_carried_over: boolean
          prize_pool_total: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          draw_date: string
          draw_type?: 'random' | 'algorithmic'
          drawn_numbers?: number[] | null
          status?: 'draft' | 'simulated' | 'published'
          jackpot_carried_over?: boolean
          prize_pool_total?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          draw_date?: string
          draw_type?: 'random' | 'algorithmic'
          drawn_numbers?: number[] | null
          status?: 'draft' | 'simulated' | 'published'
          jackpot_carried_over?: boolean
          prize_pool_total?: number
          created_at?: string
          updated_at?: string
        }
      }
      draw_entries: {
        Row: {
          id: string
          draw_id: string
          user_id: string
          scores_snapshot: number[]
          match_count: number | null
          is_winner: boolean
          created_at: string
        }
        Insert: {
          id?: string
          draw_id: string
          user_id: string
          scores_snapshot: number[]
          match_count?: number | null
          is_winner?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          draw_id?: string
          user_id?: string
          scores_snapshot?: number[]
          match_count?: number | null
          is_winner?: boolean
          created_at?: string
        }
      }
      winners: {
        Row: {
          id: string
          draw_id: string
          user_id: string
          match_type: 'three_match' | 'four_match' | 'five_match'
          prize_amount: number
          proof_url: string | null
          status: 'pending' | 'approved' | 'rejected' | 'paid'
          verified_at: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          draw_id: string
          user_id: string
          match_type: 'three_match' | 'four_match' | 'five_match'
          prize_amount: number
          proof_url?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'paid'
          verified_at?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          draw_id?: string
          user_id?: string
          match_type?: 'three_match' | 'four_match' | 'five_match'
          prize_amount?: number
          proof_url?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'paid'
          verified_at?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscription_events: {
        Row: {
          id: string
          user_id: string
          event_type: string
          stripe_event_id: string
          payload: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_type: string
          stripe_event_id: string
          payload: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_type?: string
          stripe_event_id?: string
          payload?: Json
          created_at?: string
        }
      }
    }
  }
}
