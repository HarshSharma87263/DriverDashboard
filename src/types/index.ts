// ─── Order Types ─────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'new'
  | 'accepted'
  | 'at_pickup'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Location {
  lat: number
  lng: number
  address: string
  label?: string
}

export interface Order {
  id: string
  orderNumber: string
  restaurant: string
  restaurantLocation: Location
  customerName: string
  deliveryLocation: Location
  items: OrderItem[]
  status: OrderStatus
  totalAmount: number
  driverEarnings: number
  distanceKm: number
  estimatedMinutes: number
  createdAt: Date
  acceptedAt?: Date
  pickedUpAt?: Date
  deliveredAt?: Date
}

// ─── Driver Types ─────────────────────────────────────────────────────────────

export type DriverStatus = 'online' | 'offline' | 'on_delivery'

export interface Driver {
  id: string
  name: string
  initials: string
  phone: string
  vehicleType: 'bike' | 'scooter' | 'car'
  vehicleNumber: string
  rating: number
  totalDeliveries: number
  status: DriverStatus
}

// ─── Earnings Types ───────────────────────────────────────────────────────────

export interface DailyEarning {
  day: string
  date: string
  amount: number
  deliveries: number
}

export interface EarningsSummary {
  today: number
  week: number
  month: number
  todayDeliveries: number
  weekDeliveries: number
  goal: number
  dailyBreakdown: DailyEarning[]
}

// ─── Notification Types ───────────────────────────────────────────────────────

export type NotificationType = 'order' | 'pickup_ready' | 'rating' | 'promo' | 'alert'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  orderId?: string
}

// ─── Metrics Types ────────────────────────────────────────────────────────────

export interface DashboardMetrics {
  todayEarnings: number
  todayDeliveries: number
  deliveryGoal: number
  avgRating: number
  onlineTimeMinutes: number
  acceptanceRate: number
}

// ─── Map Types ────────────────────────────────────────────────────────────────

export interface MapPin {
  x: number
  y: number
  type: 'driver' | 'pickup' | 'drop'
  label: string
}
