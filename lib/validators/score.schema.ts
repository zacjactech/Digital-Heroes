import { z } from 'zod'

export const scoreSchema = z.object({
  value: z
    .number({ required_error: 'Score is required' })
    .int('Score must be a whole number')
    .min(1, 'Score must be at least 1')
    .max(45, 'Score cannot exceed 45 (maximum Stableford score)'),

  scoreDate: z
    .string({ required_error: 'Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((date) => {
      const parsed = new Date(date)
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      return parsed <= today
    }, 'Score date cannot be in the future'),

  notes: z.string().max(200, 'Notes cannot exceed 200 characters').optional(),
})

export type ScoreInput = z.infer<typeof scoreSchema>

export const scoreErrorCodes = {
  DUPLICATE_DATE:      'A score for this date already exists',
  INVALID_RANGE:       'Score must be between 1 and 45',
  SUBSCRIPTION_LAPSED: 'Your subscription is not active',
  MAX_SCORES_ERROR:    'Score rolling logic error — contact support',
} as const

export type ScoreErrorCode = keyof typeof scoreErrorCodes
