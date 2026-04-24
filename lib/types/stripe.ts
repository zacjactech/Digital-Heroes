export type SubscriptionStatus = 'active' | 'inactive' | 'lapsed' | 'cancelled'
export type SubscriptionPlan = 'monthly' | 'yearly'

export interface CheckoutSessionParams {
  userId: string
  priceId: string
  returnUrl: string
}

export interface SubscriptionUpdateParams {
  customerId: string
  status: SubscriptionStatus
  endDate: Date
  plan?: SubscriptionPlan
}