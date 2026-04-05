import React from 'react'

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  subColor?: 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
}

export function MetricCard({ label, value, sub, subColor = 'neutral', icon }: MetricCardProps) {
  const subColorMap = {
    positive: '#27500A',
    negative: '#991B1B',
    neutral: 'var(--text-secondary)',
  }

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </div>
        {icon && (
          <div style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: subColorMap[subColor], marginTop: 5 }}>
          {sub}
        </div>
      )}
    </div>
  )
}
