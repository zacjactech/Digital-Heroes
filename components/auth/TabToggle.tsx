'use client'

interface TabToggleProps {
  activeTab: 'login' | 'register'
  setActiveTab: (tab: 'login' | 'register') => void
}

export default function TabToggle({ activeTab, setActiveTab }: TabToggleProps) {
  return (
    <div className="flex gap-8 mb-12 border-b border-auth-border">
      {(['login', 'register'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={[
            'pb-4 border-b-2 font-heading text-xl font-bold transition-colors capitalize',
            activeTab === tab
              ? 'border-gold text-gold'
              : 'border-transparent text-auth-text-muted hover:text-auth-text',
          ].join(' ')}
        >
          {tab === 'login' ? 'Login' : 'Register'}
        </button>
      ))}
    </div>
  )
}