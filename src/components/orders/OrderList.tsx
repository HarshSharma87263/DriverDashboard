import React from 'react'
import { MapPin, Clock } from 'lucide-react'
import type { Order } from '@/types'
import { getStatusLabel, getStatusColor, formatCurrency, formatRelativeTime } from '@/utils/helpers'
import { Panel } from '@/components/ui/Panel'

interface OrderListProps {
  orders: Order[]
  onAccept: (id: string) => void
  onMarkPickedUp: (id: string) => void
  onMarkDelivered: (id: string) => void
}

export function OrderList({ orders, onAccept, onMarkPickedUp, onMarkDelivered }: OrderListProps) {
  const displayOrders = orders.slice(0, 6)

  return (
    <Panel
      title="Order Queue"
      noPadding
      action={
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
          {orders.filter(o => o.status !== 'delivered').length} active
        </span>
      }
    >
      {displayOrders.map(order => (
        <OrderRow
          key={order.id}
          order={order}
          onAccept={onAccept}
          onMarkPickedUp={onMarkPickedUp}
          onMarkDelivered={onMarkDelivered}
        />
      ))}
      {displayOrders.length === 0 && (
        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
          No orders yet
        </div>
      )}
    </Panel>
  )
}

interface OrderRowProps {
  order: Order
  onAccept: (id: string) => void
  onMarkPickedUp: (id: string) => void
  onMarkDelivered: (id: string) => void
}

function OrderRow({ order, onAccept, onMarkPickedUp, onMarkDelivered }: OrderRowProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '12px 16px',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        background: hovered ? 'var(--bg-muted)' : 'transparent',
        transition: 'background 0.1s',
        cursor: 'default',
      }}
    >
      {/* Order number badge */}
      <div style={{
        fontSize: 10,
        fontWeight: 500,
        color: 'var(--text-secondary)',
        background: 'var(--bg-muted)',
        borderRadius: 'var(--radius-sm)',
        padding: '2px 7px',
        whiteSpace: 'nowrap',
        marginTop: 2,
        fontFamily: 'var(--font-mono)',
      }}>
        {order.orderNumber}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
          {order.restaurant}
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text-tertiary)',
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
          <MapPin size={10} />
          {order.deliveryLocation.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <span className={`status-pill ${getStatusColor(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <Clock size={10} />
            {formatRelativeTime(order.createdAt)} · {order.distanceKm} km
          </span>
        </div>

        {/* Action Buttons */}
        {order.status === 'new' && (
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <ActionButton onClick={() => onAccept(order.id)} variant="primary" label="Accept" />
            <ActionButton onClick={() => {}} variant="ghost" label="Decline" />
          </div>
        )}
        {order.status === 'at_pickup' && (
          <div style={{ marginTop: 8 }}>
            <ActionButton onClick={() => onMarkPickedUp(order.id)} variant="primary" label="Mark Picked Up" />
          </div>
        )}
        {order.status === 'in_transit' && (
          <div style={{ marginTop: 8 }}>
            <ActionButton onClick={() => onMarkDelivered(order.id)} variant="success" label="Mark Delivered" />
          </div>
        )}
      </div>

      {/* Earnings */}
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {formatCurrency(order.driverEarnings)}
      </div>
    </div>
  )
}

interface ActionButtonProps {
  onClick: () => void
  label: string
  variant: 'primary' | 'success' | 'ghost'
}

function ActionButton({ onClick, label, variant }: ActionButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--brand-green)',
      color: '#fff',
      border: 'none',
    },
    success: {
      background: '#065F46',
      color: '#fff',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '0.5px solid var(--border)',
    },
  }

  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: '5px 10px',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        ...styles[variant],
      }}
    >
      {label}
    </button>
  )
}
