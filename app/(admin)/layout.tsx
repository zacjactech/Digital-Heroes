'use client'

// Admin layout — wraps all admin routes. Role-gated server-side.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh bg-mist">
      {/* AdminSidebar — TODO: implement from stitch/admin_dashboard_overview */}
      <aside className="hidden md:flex w-64 bg-ink flex-col" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
