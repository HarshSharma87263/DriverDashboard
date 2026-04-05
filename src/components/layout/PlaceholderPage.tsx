import type { NavPage } from '@/hooks'

const PAGE_LABELS: Record<NavPage, string> = {
  dashboard: 'Dashboard',
  orders: 'Active Orders',
  history: 'Order History',
  earnings: 'Earnings',
  schedule: 'Schedule',
  ratings: 'Ratings',
  settings: 'Settings',
}

const PAGE_DESCRIPTIONS: Record<NavPage, string> = {
  dashboard: '',
  orders: 'View and manage all your active deliveries in one place.',
  history: 'Browse your past deliveries, receipts, and performance data.',
  earnings: 'Detailed breakdown of your earnings, payouts, and bonuses.',
  schedule: 'Plan your shifts, set availability, and view upcoming slots.',
  ratings: 'Review customer feedback, ratings, and improvement tips.',
  settings: 'Manage your profile, vehicle details, bank account, and preferences.',
}

interface PlaceholderPageProps {
  page: NavPage
}

export function PlaceholderPage({ page }: PlaceholderPageProps) {
  if (page === 'dashboard') return null

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 400,
      gap: 12,
      color: 'var(--text-tertiary)',
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
      }}>
        🚧
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>
          {PAGE_LABELS[page]}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 280, lineHeight: 1.5 }}>
          {PAGE_DESCRIPTIONS[page]}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 10 }}>
          Coming soon in this demo
        </div>
      </div>
    </div>
  )
}
