import { Navigation, CheckCircle, Phone } from 'lucide-react'
import type { Order } from '@/types'
import { formatCurrency } from '@/utils/helpers'
import { Panel } from '@/components/ui/Panel'
import { LiveMap } from '@/components/map/LiveMap'

interface ActiveOrderPanelProps {
  order: Order | null
  onMarkPickedUp: (id: string) => void
  onMarkDelivered: (id: string) => void
}

export function ActiveOrderPanel({ order, onMarkPickedUp, onMarkDelivered }: ActiveOrderPanelProps) {
  return (
    <Panel title="Live Map & Active Order" noPadding>
      <LiveMap activeOrder={order} />

      {order ? (
        <div style={{ padding: '14px 16px' }}>
          <div style={{
            fontSize: 10,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 10,
          }}>
            Current delivery
          </div>
          <div style={{
            background: 'var(--bg-muted)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                  {order.restaurant} — {order.orderNumber}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 3 }}>
                  {order.items.map(i => `${i.name}${i.quantity > 1 ? ` ×${i.quantity}` : ''}`).join(', ')}
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>
                {formatCurrency(order.driverEarnings)}
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                ETA: <strong style={{ color: 'var(--text-primary)' }}>{order.estimatedMinutes} min</strong>
                &nbsp;·&nbsp;{order.distanceKm} km
              </div>

              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-sm)',
                    border: '0.5px solid var(--border)',
                    background: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Phone size={13} />
                </button>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '0 12px',
                    height: 32,
                    borderRadius: 'var(--radius-sm)',
                    border: '0.5px solid var(--border)',
                    background: 'var(--bg-card)',
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Navigation size={12} />
                  Navigate
                </button>

                {order.status === 'at_pickup' && (
                  <button
                    onClick={() => onMarkPickedUp(order.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '0 12px',
                      height: 32,
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: 'var(--brand-amber)',
                      fontSize: 11,
                      fontWeight: 500,
                      cursor: 'pointer',
                      color: '#fff',
                    }}
                  >
                    <CheckCircle size={12} />
                    Picked Up
                  </button>
                )}

                {order.status === 'in_transit' && (
                  <button
                    onClick={() => onMarkDelivered(order.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '0 12px',
                      height: 32,
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: 'var(--brand-green)',
                      fontSize: 11,
                      fontWeight: 500,
                      cursor: 'pointer',
                      color: '#fff',
                    }}
                  >
                    <CheckCircle size={12} />
                    Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          padding: '20px 16px',
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--text-tertiary)',
        }}>
          No active delivery
        </div>
      )}
    </Panel>
  )
}
