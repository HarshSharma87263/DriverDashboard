import { Bell, Power } from 'lucide-react'
import type { Driver } from '@/types'
import { getGreeting, formatDate } from '@/utils/helpers'

interface TopbarProps {
  driver: Driver
  unreadCount: number
  onToggleStatus: () => void
  onNotificationsClick: () => void
}

export function Topbar({ driver, unreadCount, onToggleStatus, onNotificationsClick }: TopbarProps) {
  const isOnline = driver.status === 'online'

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: 'var(--bg-card)',
      borderBottom: '0.5px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
          {getGreeting()}, {driver.name.split(' ')[0]}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
          {formatDate(new Date())}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Notification Bell */}
        <button
          onClick={onNotificationsClick}
          style={{
            position: 'relative',
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-md)',
            border: '0.5px solid var(--border)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--brand-red)',
              border: '1.5px solid var(--bg-card)',
            }} />
          )}
        </button>

        {/* Online Toggle */}
        <button
          onClick={onToggleStatus}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 14px',
            borderRadius: 'var(--radius-md)',
            border: isOnline ? '0.5px solid #97C459' : '0.5px solid var(--border)',
            background: isOnline ? '#EAF3DE' : 'var(--bg-muted)',
            color: isOnline ? '#27500A' : 'var(--text-secondary)',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Power size={13} />
          {isOnline ? 'Online' : 'Offline'}
        </button>
      </div>
    </header>
  )
}
