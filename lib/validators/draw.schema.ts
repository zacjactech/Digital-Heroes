import { z } from 'zod'

export const drawSchema = z.object({
  name: z
    .string({ required_error: 'Draw name is required' })
    .min(3, 'Name must be at least 3 characters')
    .max(100),

  drawDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  mode: z.enum(['random', 'algorithmic'], {
    required_error: 'Draw mode is required',
  }),

  prizePool: z
    .number()
    .positive('Prize pool must be positive')
    .max(1_000_000, 'Prize pool cannot exceed £1,000,000'),

  jackpotCarryIn: z.number().min(0).default(0),
})

export type DrawInput = z.infer<typeof drawSchema>
