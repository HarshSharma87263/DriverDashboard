import React from 'react'
import {
  LayoutDashboard, ShoppingBag, History,
  Wallet, CalendarDays, Star, Settings,
} from 'lucide-react'
import type { Driver } from '@/types'
import type { NavPage } from '@/hooks'

interface NavItem {
  id: NavPage
  label: string
  icon: React.ReactNode
  badge?: number
}

interface SidebarProps {
  driver: Driver
  activePage: NavPage
  onNavigate: (page: NavPage) => void
  activeOrderCount: number
  unreadCount: number
}

const NAV_ITEMS = (activeOrderCount: number): NavItem[] => [
  { id: 'dashboard',  label: 'Dashboard',     icon: <LayoutDashboard size={16} /> },
  { id: 'orders',     label: 'Active Orders',  icon: <ShoppingBag size={16} />,     badge: activeOrderCount },
  { id: 'history',    label: 'Order History',  icon: <History size={16} /> },
  { id: 'earnings',   label: 'Earnings',       icon: <Wallet size={16} /> },
  { id: 'schedule',   label: 'Schedule',       icon: <CalendarDays size={16} /> },
  { id: 'ratings',    label: 'Ratings',        icon: <Star size={16} /> },
  { id: 'settings',   label: 'Settings',       icon: <Settings size={16} /> },
]

export function Sidebar({ driver, activePage, onNavigate, activeOrderCount }: SidebarProps) {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'var(--sidebar-bg)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>

      {/* Logo */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '0.5px solid var(--sidebar-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'var(--brand-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14 }}>⚡</span>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px' }}>
              SwiftBite
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
              Driver Portal
            </div>
          </div>
        </div>
      </div>

      {/* Driver Card */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '0.5px solid var(--sidebar-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'var(--brand-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 600,
          color: '#04342C',
          flexShrink: 0,
        }}>
          {driver.initials}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {driver.name}
          </div>
          <div style={{
            fontSize: 11,
            color: driver.status === 'online' ? 'var(--brand-green)' : 'rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginTop: 3,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: driver.status === 'online' ? 'var(--brand-green)' : 'rgba(255,255,255,0.3)',
              display: 'inline-block',
            }} />
            {driver.status === 'online' ? 'Online — Available' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
        {NAV_ITEMS(activeOrderCount).map(item => {
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 20px',
                fontSize: 13,
                color: isActive ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
                background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '2px solid var(--sidebar-accent)' : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.12s ease',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  const el = e.currentTarget
                  el.style.background = 'var(--sidebar-hover)'
                  el.style.color = 'rgba(255,255,255,0.8)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  const el = e.currentTarget
                  el.style.background = 'transparent'
                  el.style.color = 'var(--sidebar-text)'
                }
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span style={{
                  background: 'var(--brand-red)',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 10,
                  lineHeight: 1.6,
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '0.5px solid var(--sidebar-border)',
        fontSize: 10,
        color: 'rgba(255,255,255,0.25)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>{driver.vehicleNumber}</span>
        <span>v2.4.1</span>
      </div>
    </aside>
  )
}
