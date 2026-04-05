import type { EarningsSummary } from '@/types'
import { formatCurrency, getBarWidth } from '@/utils/helpers'
import { Panel } from '@/components/ui/Panel'

interface EarningsPanelProps {
  earnings: EarningsSummary
}

export function EarningsPanel({ earnings }: EarningsPanelProps) {
  const maxAmount = Math.max(...earnings.dailyBreakdown.map(d => d.amount))
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 3)

  return (
    <Panel
      title="Weekly Earnings"
      action={
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {formatCurrency(earnings.week)} this week
        </span>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {earnings.dailyBreakdown.map(day => {
          const isToday = day.day === today
          const pct = getBarWidth(day.amount, maxAmount)
          return (
            <div key={day.day} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                fontSize: 11,
                color: isToday ? 'var(--text-primary)' : 'var(--text-tertiary)',
                fontWeight: isToday ? 600 : 400,
                width: 28,
                flexShrink: 0,
              }}>
                {day.day}
              </div>
              <div style={{
                flex: 1,
                height: 8,
                background: 'var(--bg-muted)',
                borderRadius: 4,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: isToday ? 'var(--brand-green)' : '#B4B2A9',
                  borderRadius: 4,
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <div style={{
                fontSize: 11,
                color: isToday ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isToday ? 500 : 400,
                width: 44,
                textAlign: 'right',
                flexShrink: 0,
              }}>
                {formatCurrency(day.amount)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary row */}
      <div style={{
        display: 'flex',
        gap: 10,
        marginTop: 16,
        paddingTop: 14,
        borderTop: '0.5px solid var(--border)',
      }}>
        {[
          { label: 'Today', value: formatCurrency(earnings.today) },
          { label: 'Deliveries', value: String(earnings.weekDeliveries) },
          { label: 'Per drop', value: formatCurrency(Math.round(earnings.week / earnings.weekDeliveries)) },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
