export const PRICING_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 19.99,
    period: '/month',
    featured: false,
    description: 'For casual players making a steady impact.',
    features: [
      'Monthly prize draws',
      'Support your chosen charity',
      'Track Stableford scores',
      'Access draw results',
      'Email notifications',
    ],
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 199.99,
    period: '/year',
    featured: true,
    description: 'Maximize your impact and savings.',
    savings: 'Save £39.88 vs monthly',
    features: [
      'Monthly prize draws',
      'Support your chosen charity',
      'Track Stableford scores',
      'Access draw results',
      'Email notifications',
      'Early access to new features',
    ],
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
  },
];

export const FEATURES_COMPARISON = [
  { name: 'Monthly prize draws', monthly: true, yearly: true },
  { name: 'Charity support (10%)', monthly: true, yearly: true },
  { name: 'Stableford tracking', monthly: true, yearly: true },
  { name: 'Draw history', monthly: true, yearly: true },
  { name: 'Winner verification', monthly: true, yearly: true },
  { name: 'Priority support', monthly: false, yearly: true },
  { name: 'Annual tax summary', monthly: false, yearly: true },
];

export const FAQS = [
  {
    question: "How does the prize draw work?",
    answer: "Every month, we pool subscription fees and select winners through a verified random draw. 40% of the pool goes to the Jackpot (5/5 matches), with further prizes for 4/5 and 3/5 matches."
  },
  {
    question: "How much goes to charity?",
    answer: "Exactly 10% of every subscription fee is donated directly to the charity you select during registration. We handle all the administration and provide annual tax summaries for yearly members."
  },
  {
    question: "Can I change my chosen charity?",
    answer: "Yes! You can update your chosen charity at any time through your member dashboard. The change will take effect from your next billing cycle."
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No. For monthly plans, you can cancel at any time and your access will continue until the end of your current period. Yearly plans offer significant savings but are non-refundable."
  },
  {
    question: "What is Stableford tracking?",
    answer: "Stableford is a popular golf scoring system. Digital Heroes allows you to log your scores from your rounds, track your progress over time, and compare with other members in your area."
  }
];
