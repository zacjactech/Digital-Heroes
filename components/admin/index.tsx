// Admin component stubs
// Implement from stitch/admin_dashboard_overview/code.html

import type { ReactNode } from 'react'

interface KPICardProps {
  title: string
  value: string | number
  trend?: number
  icon?: ReactNode
}
export function KPICard({ title, value }: KPICardProps) {
  return (
    <div className="card">
      <p className="font-heading font-semibold text-sm text-moss">{title}</p>
      <p className="font-mono text-2xl font-bold text-ink mt-1">{value}</p>
    </div>
  )
}

export function DrawManager() {
  return <div className="card">Draw manager stub</div>
}

export function UserTable() {
  return <div className="card">User table stub</div>
}

export function VerificationCard() {
  return <div className="card">Verification card stub</div>
}

export function AnalyticsChart() {
  return <div className="card">Analytics chart stub</div>
}
