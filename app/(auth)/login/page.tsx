'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import AuthLeftPanel from '@/components/auth/AuthLeftPanel'
import TabToggle from '@/components/auth/TabToggle'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import SocialProof from '@/components/auth/SocialProof'
import { createClientBrowser } from '@/lib/auth/supabase-client'
import { validateLoginForm, validateRegisterForm } from '@/lib/auth/validation'

interface Charity {
  id: string
  name: string
}

const DEFAULT_CHARITIES: Charity[] = [
  { id: '1', name: 'Akshay Patra Foundation' },
  { id: '2', name: 'Goonj' },
  { id: '3', name: 'Pratham Education' },
  { id: '4', name: 'Make A Wish India' },
  { id: '5', name: 'HelpAge India' },
  { id: '6', name: 'Wildlife Trust of India' },
]

export default function AuthPage() {
  const router = useRouter()
  const [charities, setCharities] = useState<Charity[]>(DEFAULT_CHARITIES)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [rememberMe, setRememberMe] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [charityId, setCharityId] = useState('')
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [tab, setTab] = useState<'login' | 'register'>('login')

  // Fetch charities from Supabase on mount
  useEffect(() => {
    let isMounted = true

    async function loadCharities() {
      try {
        const supabase = createClientBrowser()
        const { data } = await supabase
          .from('charities')
          .select('id, name')
          .eq('is_active', true)
          .order('name')
          .limit(20)

        if (isMounted && data && data.length > 0) {
          setCharities(data)
        }
      } catch {
        // Use default charities on error
      }
    }

    loadCharities()

    return () => {
      isMounted = false
    }
  }, [])

  const charityOptions = [
    { value: '', label: 'Select a charity...' },
    ...charities.map((c) => ({ value: c.id, label: c.name })),
  ]

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setErrors({})

    const validation = validateLoginForm(email, password)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClientBrowser()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      router.push('/dashboard')
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setErrors({})

    if (!agreeTerms) {
      setError('You must agree to the Terms of Service')
      return
    }

    const validation = validateRegisterForm(fullName, email, password, confirmPassword)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClientBrowser()
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: fullName,
          email: email,
          charity_id: charityId || null,
          subscription_status: 'inactive',
          subscription_plan: plan,
          charity_pct: 100,
        } as never)
      }

      router.push('/subscribe')
    } catch {
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      leftPanel={<AuthLeftPanel />}
      rightPanel={
        <div className="p-8 md:p-12">
          <TabToggle activeTab={tab} setActiveTab={setTab} />
          
          {tab === 'login' ? (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
              error={error}
              errors={errors}
              handleSubmit={handleLoginSubmit}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
            />
          ) : (
            <RegisterForm
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              charityId={charityId}
              setCharityId={setCharityId}
              plan={plan}
              setPlan={setPlan}
              agreeTerms={agreeTerms}
              setAgreeTerms={setAgreeTerms}
              isLoading={isLoading}
              error={error}
              errors={errors}
              handleSubmit={handleRegisterSubmit}
              charityOptions={charityOptions}
            />
          )}
          
          <SocialProof />
        </div>
      }
    />
  )
}