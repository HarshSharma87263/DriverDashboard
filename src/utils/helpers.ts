import type { OrderStatus, NotificationType } from '@/types'

// ─── Time Formatting ──────────────────────────────────────────────────────────

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

export function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin} min ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export function formatOnlineTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

// ─── Currency Formatting ──────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

// ─── Status Helpers ───────────────────────────────────────────────────────────

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    new: 'New',
    accepted: 'Accepted',
    at_pickup: 'At Pickup',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  }
  return labels[status]
}

export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    new: 'status-new',
    accepted: 'status-accepted',
    at_pickup: 'status-pickup',
    in_transit: 'status-transit',
    delivered: 'status-delivered',
    cancelled: 'status-cancelled',
  }
  return colors[status]
}

export function getNotificationIcon(type: NotificationType): string {
  const icons: Record<NotificationType, string> = {
    order: '📦',
    pickup_ready: '⏱',
    rating: '⭐',
    promo: '🎯',
    alert: '🔔',
  }
  return icons[type]
}

export function getNotificationColorClass(type: NotificationType): string {
  const colors: Record<NotificationType, string> = {
    order: 'notif-blue',
    pickup_ready: 'notif-amber',
    rating: 'notif-green',
    promo: 'notif-purple',
    alert: 'notif-red',
  }
  return colors[type]
}

// ─── Stats Helpers ────────────────────────────────────────────────────────────

export function getGoalPercentage(current: number, goal: number): number {
  return Math.min(Math.round((current / goal) * 100), 100)
}

export function getBarWidth(amount: number, max: number): number {
  return Math.round((amount / max) * 100)
}

// ─── Greeting ────────────────────────────────────────────────────────────────

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// ─── Date ────────────────────────────────────────────────────────────────────

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
