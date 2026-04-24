'use client'

// Dashboard layout — wraps all authenticated user routes
// Includes sidebar (desktop) and bottom tab bar (mobile)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh bg-mist">
      {/* DashboardSidebar — TODO: implement from stitch/member_dashboard */}
      <aside className="hidden md:flex w-64 bg-forest flex-col" />

      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* MobileTabBar — TODO: implement from stitch/mobile_dashboard */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-forest" />
    </div>
  )
}
