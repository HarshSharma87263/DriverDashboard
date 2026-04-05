import React from 'react'

interface PanelProps {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
  noPadding?: boolean
}

export function Panel({ title, action, children, noPadding = false }: PanelProps) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        padding: '14px 16px',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
          {title}
        </span>
        {action}
      </div>
      <div style={noPadding ? {} : { padding: '14px 16px', flex: 1 }}>
        {children}
      </div>
    </div>
  )
}
