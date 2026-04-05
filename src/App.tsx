import { useDriver, useOrders, useEarnings, useNotifications, useMetrics, useNavigation } from '@/hooks'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { DashboardPage } from '@/components/layout/DashboardPage'
import { PlaceholderPage } from '@/components/layout/PlaceholderPage'

export default function App() {
  const { driver, toggleStatus } = useDriver()
  const { orders, activeOrder, activeOrders, acceptOrder, markPickedUp, markDelivered } = useOrders()
  const { earnings } = useEarnings()
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications()
  const { metrics } = useMetrics()
  const { activePage, setActivePage } = useNavigation()

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-page)',
    }}>
      <Sidebar
        driver={driver}
        activePage={activePage}
        onNavigate={setActivePage}
        activeOrderCount={activeOrders.length}
        unreadCount={unreadCount}
      />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Topbar
          driver={driver}
          unreadCount={unreadCount}
          onToggleStatus={toggleStatus}
          onNotificationsClick={() => setActivePage('orders')}
        />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
        }}>
          {activePage === 'dashboard' ? (
            <DashboardPage
              metrics={metrics}
              earnings={earnings}
              orders={orders}
              activeOrder={activeOrder}
              notifications={notifications}
              unreadCount={unreadCount}
              onAccept={acceptOrder}
              onMarkPickedUp={markPickedUp}
              onMarkDelivered={markDelivered}
              onMarkAsRead={markAsRead}
              onMarkAllRead={markAllRead}
            />
          ) : (
            <PlaceholderPage page={activePage} />
          )}
        </main>
      </div>
    </div>
  )
}
