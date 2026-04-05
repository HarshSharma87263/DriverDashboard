import { useState, useEffect, useCallback } from 'react'
import type { Driver, Order, EarningsSummary, Notification, DashboardMetrics, DriverStatus, OrderStatus } from '@/types'
import { MOCK_DRIVER, MOCK_ORDERS, MOCK_EARNINGS, MOCK_NOTIFICATIONS, MOCK_METRICS } from '@/data/mockData'

// ─── useDriver ────────────────────────────────────────────────────────────────

export function useDriver() {
  const [driver, setDriver] = useState<Driver>(MOCK_DRIVER)

  const toggleStatus = useCallback(() => {
    setDriver(prev => ({
      ...prev,
      status: prev.status === 'online' ? 'offline' : 'online',
    }))
  }, [])

  const setDriverStatus = useCallback((status: DriverStatus) => {
    setDriver(prev => ({ ...prev, status }))
  }, [])

  return { driver, toggleStatus, setDriverStatus }
}

// ─── useOrders ────────────────────────────────────────────────────────────────

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [activeOrderId, setActiveOrderId] = useState<string | null>('ord_5815')

  const activeOrder = orders.find(o => o.id === activeOrderId) ?? null

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o
        const updated = { ...o, status }
        if (status === 'in_transit') updated.pickedUpAt = new Date()
        if (status === 'delivered') updated.deliveredAt = new Date()
        if (status === 'accepted') updated.acceptedAt = new Date()
        return updated
      })
    )
  }, [])

  const acceptOrder = useCallback((orderId: string) => {
    updateOrderStatus(orderId, 'accepted')
    setActiveOrderId(orderId)
  }, [updateOrderStatus])

  const markPickedUp = useCallback((orderId: string) => {
    updateOrderStatus(orderId, 'in_transit')
  }, [updateOrderStatus])

  const markDelivered = useCallback((orderId: string) => {
    updateOrderStatus(orderId, 'delivered')
    setActiveOrderId(null)
  }, [updateOrderStatus])

  const recentOrders = orders.filter(o => o.status === 'delivered').slice(0, 5)
  const activeOrders = orders.filter(o =>
    ['new', 'accepted', 'at_pickup', 'in_transit'].includes(o.status)
  )

  return {
    orders,
    activeOrder,
    activeOrders,
    recentOrders,
    acceptOrder,
    markPickedUp,
    markDelivered,
    updateOrderStatus,
  }
}

// ─── useEarnings ──────────────────────────────────────────────────────────────

export function useEarnings() {
  const [earnings] = useState<EarningsSummary>(MOCK_EARNINGS)
  return { earnings }
}

// ─── useNotifications ────────────────────────────────────────────────────────

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  return { notifications, unreadCount, markAsRead, markAllRead }
}

// ─── useMetrics ───────────────────────────────────────────────────────────────

export function useMetrics() {
  const [metrics] = useState<DashboardMetrics>(MOCK_METRICS)
  return { metrics }
}

// ─── useClock ─────────────────────────────────────────────────────────────────

export function useClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return { now }
}

// ─── useNavigation ────────────────────────────────────────────────────────────

export type NavPage = 'dashboard' | 'orders' | 'history' | 'earnings' | 'schedule' | 'ratings' | 'settings'

export function useNavigation() {
  const [activePage, setActivePage] = useState<NavPage>('dashboard')
  return { activePage, setActivePage }
}
