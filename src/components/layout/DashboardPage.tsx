import { TrendingUp, Package, Star, Clock } from 'lucide-react'
import type { DashboardMetrics, EarningsSummary, Order, Notification } from '@/types'
import { MetricCard } from '@/components/ui/MetricCard'
import { OrderList } from '@/components/orders/OrderList'
import { ActiveOrderPanel } from '@/components/orders/ActiveOrderPanel'
import { EarningsPanel } from '@/components/earnings/EarningsPanel'
import { NotificationsPanel } from '@/components/notifications/NotificationsPanel'
import { formatCurrency, formatOnlineTime, getGoalPercentage } from '@/utils/helpers'

interface DashboardPageProps {
  metrics: DashboardMetrics
  earnings: EarningsSummary
  orders: Order[]
  activeOrder: Order | null
  notifications: Notification[]
  unreadCount: number
  onAccept: (id: string) => void
  onMarkPickedUp: (id: string) => void
  onMarkDelivered: (id: string) => void
  onMarkAsRead: (id: string) => void
  onMarkAllRead: () => void
}

export function DashboardPage({
  metrics,
  earnings,
  orders,
  activeOrder,
  notifications,
  unreadCount,
  onAccept,
  onMarkPickedUp,
  onMarkDelivered,
  onMarkAsRead,
  onMarkAllRead,
}: DashboardPageProps) {
  const goalPct = getGoalPercentage(metrics.todayDeliveries, metrics.deliveryGoal)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 10,
      }}>
        <MetricCard
          label="Today's Earnings"
          value={formatCurrency(metrics.todayEarnings)}
          sub="↑ 18% vs yesterday"
          subColor="positive"
          icon={<TrendingUp size={14} />}
        />
        <MetricCard
          label="Deliveries"
          value={String(metrics.todayDeliveries)}
          sub={`Goal: ${metrics.deliveryGoal} · ${goalPct}% complete`}
          subColor={goalPct >= 80 ? 'positive' : 'neutral'}
          icon={<Package size={14} />}
        />
        <MetricCard
          label="Avg Rating"
          value={metrics.avgRating.toFixed(2)}
          sub="Last 30 days"
          subColor="neutral"
          icon={<Star size={14} />}
        />
        <MetricCard
          label="Online Time"
          value={formatOnlineTime(metrics.onlineTimeMinutes)}
          sub={`Acceptance: ${metrics.acceptanceRate}%`}
          subColor={metrics.acceptanceRate >= 90 ? 'positive' : 'negative'}
          icon={<Clock size={14} />}
        />
      </div>

      {/* Progress bar for daily goal */}
      <div style={{
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          Daily Goal
        </span>
        <div style={{ flex: 1, height: 6, background: 'var(--bg-muted)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${goalPct}%`,
            background: goalPct >= 100
              ? 'var(--brand-green-dark)'
              : goalPct >= 60
                ? 'var(--brand-green)'
                : 'var(--brand-amber)',
            borderRadius: 3,
            transition: 'width 0.5s ease',
          }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
          {metrics.todayDeliveries} / {metrics.deliveryGoal}
        </span>
      </div>

      {/* Main two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 14,
        alignItems: 'start',
      }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <OrderList
            orders={orders}
            onAccept={onAccept}
            onMarkPickedUp={onMarkPickedUp}
            onMarkDelivered={onMarkDelivered}
          />
          <EarningsPanel earnings={earnings} />
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ActiveOrderPanel
            order={activeOrder}
            onMarkPickedUp={onMarkPickedUp}
            onMarkDelivered={onMarkDelivered}
          />
          <NotificationsPanel
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={onMarkAsRead}
            onMarkAllRead={onMarkAllRead}
          />
        </div>
      </div>
    </div>
  )
}
