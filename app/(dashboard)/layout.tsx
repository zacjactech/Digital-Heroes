import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { MobileTabBar } from '@/components/dashboard/MobileTabBar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, subscription_status, subscription_end_at')
      .eq('id', user.id)
      .single()
    
    if (data) {
      profile = {
        fullName: data.full_name || 'Member',
        subscriptionStatus: data.subscription_status || 'inactive',
        subscriptionExpires: data.subscription_end_at ? new Date(data.subscription_end_at).toLocaleDateString('en-GB') : 'N/A'
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-auth-bg text-auth-text">
      <DashboardSidebar user={profile || undefined} />

      <main className="flex-1 md:ml-[260px] p-6 md:p-10 pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <MobileTabBar />
    </div>
  )
}
