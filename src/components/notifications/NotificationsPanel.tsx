import type { Notification } from '@/types'
import { getNotificationIcon, getNotificationColorClass, formatRelativeTime } from '@/utils/helpers'
import { Panel } from '@/components/ui/Panel'

interface NotificationsPanelProps {
  notifications: Notification[]
  unreadCount: number
  onMarkAsRead: (id: string) => void
  onMarkAllRead: () => void
}

export function NotificationsPanel({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllRead,
}: NotificationsPanelProps) {
  return (
    <Panel
      title="Notifications"
      noPadding
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {unreadCount > 0 && (
            <span style={{
              background: 'var(--brand-red)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 600,
              padding: '1px 6px',
              borderRadius: 10,
            }}>
              {unreadCount}
            </span>
          )}
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              style={{
                fontSize: 11,
                color: 'var(--brand-green)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Mark all read
            </button>
          )}
        </div>
      }
    >
      {notifications.slice(0, 5).map(notif => (
        <div
          key={notif.id}
          onClick={() => onMarkAsRead(notif.id)}
          style={{
            padding: '10px 16px',
            borderBottom: '0.5px solid var(--border)',
            display: 'flex',
            gap: 10,
            cursor: 'pointer',
            background: notif.read ? 'transparent' : 'rgba(29, 158, 117, 0.03)',
            transition: 'background 0.1s',
          }}
        >
          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            flexShrink: 0,
          }} className={getNotificationColorClass(notif.type)}>
            {getNotificationIcon(notif.type)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 12,
              color: 'var(--text-primary)',
              lineHeight: 1.45,
              fontWeight: notif.read ? 400 : 500,
            }}>
              {notif.message}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>
              {formatRelativeTime(notif.timestamp)}
            </div>
          </div>
          {!notif.read && (
            <div style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--brand-green)',
              flexShrink: 0,
              marginTop: 4,
            }} />
          )}
        </div>
      ))}
    </Panel>
  )
}
