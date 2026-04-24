'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import PlanToggle from '@/components/auth/PlanToggle'
import { cn } from '@/lib/utils'

type Step = 1 | 2 | 3

interface RegisterFormProps {
  fullName: string
  setFullName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  charityId: string
  setCharityId: (value: string) => void
  plan: 'monthly' | 'yearly'
  setPlan: (plan: 'monthly' | 'yearly') => void
  agreeTerms: boolean
  setAgreeTerms: (value: boolean) => void
  isLoading: boolean
  error: string
  errors: Record<string, string>
  handleSubmit: (e: React.FormEvent) => void
  charityOptions: { value: string; label: string }[]
}

// Shared underline input for the dark auth context
function AuthInput({
  type,
  value,
  onChange,
  disabled,
  placeholder,
  hasError,
  rightSlot,
}: {
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder: string
  hasError?: boolean
  rightSlot?: React.ReactNode
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={[
          'w-full bg-transparent border-0 border-b-2 py-4 font-body text-lg pr-10',
          'text-auth-text placeholder-auth-text-muted/40',
          'focus:outline-none transition-colors',
          hasError
            ? 'border-red-500 focus:border-red-400'
            : 'border-auth-border focus:border-gold',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
      />
      {rightSlot && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {rightSlot}
        </div>
      )}
    </div>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-red-400 text-sm mt-1">{message}</p>
}

export default function RegisterForm({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  charityId,
  setCharityId,
  plan,
  setPlan,
  agreeTerms,
  setAgreeTerms,
  isLoading,
  error,
  errors,
  handleSubmit,
  charityOptions,
}: RegisterFormProps) {
  const [step, setStep] = useState<Step>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const nextStep = () => {
    if (step === 1 && (!fullName || !email || !password || !confirmPassword)) return
    if (step === 1 && password !== confirmPassword) return
    if (step === 2 && !charityId) return
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s))
  }
  const prevStep = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))

  const stepTitles: Record<Step, string> = {
    1: 'Create Account',
    2: 'Choose Your Plan',
    3: 'Confirm Details',
  }
  const stepSubs: Record<Step, string> = {
    1: 'Join the community and start making a difference.',
    2: 'Select your membership tier and charity.',
    3: 'Review and confirm your details.',
  }

  const EyeToggle = ({
    show,
    onToggle,
  }: {
    show: boolean
    onToggle: () => void
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="text-auth-text-muted hover:text-auth-text transition-colors"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      <span className="material-symbols-outlined text-xl">
        {show ? 'visibility_off' : 'visibility'}
      </span>
    </button>
  )

  return (
    <div>
      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        {([1, 2, 3] as const).map((s) => (
          <div
            key={s}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-300',
              s <= step ? 'bg-gold' : 'bg-auth-border',
            )}
          />
        ))}
      </div>

      {/* Step heading */}
      <div className="mb-10">
        <h2 className="font-display text-4xl font-bold text-auth-text mb-2">
          {stepTitles[step]}
        </h2>
        <p className="text-auth-text-muted font-body">{stepSubs[step]}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Global error */}
        {error && (
          <div className="p-4 bg-red-950/60 border border-red-500/60 rounded-lg mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* ── Step 1: Account Details ── */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-2 block">
                Full Name
              </label>
              <AuthInput
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                placeholder="Jane Smith"
                hasError={!!errors.fullName}
              />
              <FieldError message={errors.fullName} />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-2 block">
                Email Address
              </label>
              <AuthInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="your@email.com"
                hasError={!!errors.email}
              />
              <FieldError message={errors.email} />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-2 block">
                Password
              </label>
              <AuthInput
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••••"
                hasError={!!errors.password}
                rightSlot={
                  <EyeToggle
                    show={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                }
              />
              <FieldError message={errors.password} />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-2 block">
                Confirm Password
              </label>
              <AuthInput
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••••"
                hasError={!!errors.confirmPassword}
                rightSlot={
                  <EyeToggle
                    show={showConfirm}
                    onToggle={() => setShowConfirm(!showConfirm)}
                  />
                }
              />
              <FieldError message={errors.confirmPassword} />
            </div>
          </div>
        )}

        {/* ── Step 2: Plan & Charity ── */}
        {step === 2 && (
          <div className="space-y-10">
            {/* Charity selector */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-4 block">
                1. Choose Your Charity
              </label>
              <div className="relative">
                <select
                  value={charityId}
                  onChange={(e) => setCharityId(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    'w-full bg-auth-surface text-auth-text rounded-xl border-2 border-auth-border',
                    'font-body py-4 px-5 appearance-none cursor-pointer transition-colors',
                    'focus:outline-none focus:border-gold hover:border-gold/50',
                    isLoading && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  {charityOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-auth-surface text-auth-text"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-auth-text-muted pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Plan selector */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-auth-text-muted mb-4 block">
                2. Select Membership Tier
              </label>
              <PlanToggle selectedPlan={plan} setSelectedPlan={setPlan} />
            </div>
          </div>
        )}

        {/* ── Step 3: Confirm ── */}
        {step === 3 && (
          <div className="space-y-8">
            {/* Summary card */}
            <div className="p-8 bg-auth-surface rounded-2xl border border-auth-border space-y-5">
              {[
                { label: 'Name', value: fullName },
                { label: 'Email', value: email },
                {
                  label: 'Charity',
                  value: charityOptions.find((o) => o.value === charityId)?.label ?? '—',
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-auth-border pb-4"
                >
                  <span className="text-auth-text-muted font-body">{label}</span>
                  <span className="text-auth-text font-medium">{value}</span>
                </div>
              ))}

              {/* Plan row */}
              <div className="flex justify-between border-b border-auth-border pb-4">
                <span className="text-auth-text-muted font-body">Plan</span>
                <span className="text-gold font-bold">
                  {plan === 'monthly' ? 'Monthly' : 'Yearly'} Subscription
                </span>
              </div>

              {/* Price row */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-auth-text-muted font-body">Total due today</span>
                <div className="text-right">
                  <div className="font-mono text-auth-text font-bold text-3xl">
                    {plan === 'monthly' ? '£19.99' : '£199.99'}
                  </div>
                  <div className="text-auth-text-muted text-xs mt-1">
                    Includes all fees and donations
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <Checkbox
              checked={agreeTerms}
              onChange={setAgreeTerms}
              disabled={isLoading}
              label={
                <>
                  I agree to the{' '}
                  <a href="/terms" className="text-gold hover:text-gold/80 underline underline-offset-2">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-gold hover:text-gold/80 underline underline-offset-2">
                    Privacy Policy
                  </a>
                </>
              }
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-12">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1 py-4 border-auth-border text-auth-text-muted hover:text-auth-text hover:border-auth-text-muted"
            >
              Back
            </Button>
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              fullWidth={step === 1}
              className={cn(
                'py-4 shadow-[0_4px_20px_rgba(200,151,73,0.15)]',
                step > 1 ? 'flex-1' : 'w-full',
              )}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              isLoading={isLoading}
              className="flex-1 py-4 shadow-[0_4px_20px_rgba(200,151,73,0.25)]"
            >
              Create Account
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}