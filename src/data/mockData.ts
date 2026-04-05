import type {
  Driver,
  Order,
  EarningsSummary,
  Notification,
  DashboardMetrics,
} from '@/types'

// ─── Driver ──────────────────────────────────────────────────────────────────

export const MOCK_DRIVER: Driver = {
  id: 'drv_001',
  name: 'Ravi Kumar',
  initials: 'RK',
  phone: '+91 98765 43210',
  vehicleType: 'scooter',
  vehicleNumber: 'DL 4S AB 1234',
  rating: 4.87,
  totalDeliveries: 1842,
  status: 'online',
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_5821',
    orderNumber: '#5821',
    restaurant: 'Spice Garden',
    restaurantLocation: {
      lat: 28.634,
      lng: 77.118,
      address: '14B, Rajouri Garden, New Delhi',
      label: 'Spice Garden',
    },
    customerName: 'Priya Sharma',
    deliveryLocation: {
      lat: 28.641,
      lng: 77.109,
      address: 'C-12, Tagore Garden, New Delhi',
      label: 'Priya\'s Home',
    },
    items: [
      { name: 'Dal Makhani', quantity: 1, price: 220 },
      { name: 'Garlic Naan', quantity: 2, price: 60 },
      { name: 'Paneer Tikka', quantity: 1, price: 280 },
    ],
    status: 'new',
    totalAmount: 620,
    driverEarnings: 68,
    distanceKm: 2.3,
    estimatedMinutes: 18,
    createdAt: new Date(Date.now() - 1 * 60 * 1000),
  },
  {
    id: 'ord_5818',
    orderNumber: '#5818',
    restaurant: 'Burger Bros',
    restaurantLocation: {
      lat: 28.632,
      lng: 77.219,
      address: 'N-17, Connaught Place, New Delhi',
      label: 'Burger Bros',
    },
    customerName: 'Amit Verma',
    deliveryLocation: {
      lat: 28.628,
      lng: 77.208,
      address: '3A, Janpath, New Delhi',
      label: 'Amit\'s Office',
    },
    items: [
      { name: 'Double Smash Burger', quantity: 2, price: 320 },
      { name: 'Loaded Fries', quantity: 1, price: 120 },
      { name: 'Cold Brew', quantity: 2, price: 90 },
    ],
    status: 'at_pickup',
    totalAmount: 940,
    driverEarnings: 54,
    distanceKm: 1.1,
    estimatedMinutes: 8,
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: 'ord_5815',
    orderNumber: '#5815',
    restaurant: 'Delhi Darbar',
    restaurantLocation: {
      lat: 28.567,
      lng: 77.243,
      address: '8, Lajpat Nagar, New Delhi',
      label: 'Delhi Darbar',
    },
    customerName: 'Sneha Gupta',
    deliveryLocation: {
      lat: 28.559,
      lng: 77.231,
      address: 'B-45, Defence Colony, New Delhi',
      label: 'Sneha\'s Home',
    },
    items: [
      { name: 'Butter Chicken', quantity: 1, price: 340 },
      { name: 'Naan', quantity: 2, price: 40 },
      { name: 'Raita', quantity: 1, price: 60 },
    ],
    status: 'in_transit',
    totalAmount: 480,
    driverEarnings: 72,
    distanceKm: 3.7,
    estimatedMinutes: 8,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 28 * 60 * 1000),
    pickedUpAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 'ord_5811',
    orderNumber: '#5811',
    restaurant: 'Pizza Palace',
    restaurantLocation: {
      lat: 28.551,
      lng: 77.158,
      address: '5A, Vasant Vihar, New Delhi',
      label: 'Pizza Palace',
    },
    customerName: 'Rohan Mehta',
    deliveryLocation: {
      lat: 28.544,
      lng: 77.149,
      address: 'D-22, Vasant Enclave, New Delhi',
      label: 'Rohan\'s Home',
    },
    items: [
      { name: 'Margherita (L)', quantity: 1, price: 450 },
      { name: 'Pasta Arrabbiata', quantity: 1, price: 280 },
      { name: 'Garlic Bread', quantity: 1, price: 120 },
    ],
    status: 'delivered',
    totalAmount: 850,
    driverEarnings: 85,
    distanceKm: 1.9,
    estimatedMinutes: 0,
    createdAt: new Date(Date.now() - 75 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 73 * 60 * 1000),
    pickedUpAt: new Date(Date.now() - 60 * 60 * 1000),
    deliveredAt: new Date(Date.now() - 35 * 60 * 1000),
  },
  {
    id: 'ord_5809',
    orderNumber: '#5809',
    restaurant: 'Wok Express',
    restaurantLocation: {
      lat: 28.612,
      lng: 77.228,
      address: 'M-1, Greater Kailash 1, New Delhi',
      label: 'Wok Express',
    },
    customerName: 'Kavya Reddy',
    deliveryLocation: {
      lat: 28.618,
      lng: 77.238,
      address: 'F-88, Hauz Khas, New Delhi',
      label: 'Kavya\'s Home',
    },
    items: [
      { name: 'Schezwan Noodles', quantity: 2, price: 180 },
      { name: 'Kung Pao Veg', quantity: 1, price: 220 },
    ],
    status: 'delivered',
    totalAmount: 580,
    driverEarnings: 61,
    distanceKm: 2.6,
    estimatedMinutes: 0,
    createdAt: new Date(Date.now() - 120 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 118 * 60 * 1000),
    pickedUpAt: new Date(Date.now() - 105 * 60 * 1000),
    deliveredAt: new Date(Date.now() - 90 * 60 * 1000),
  },
]

// ─── Earnings ─────────────────────────────────────────────────────────────────

export const MOCK_EARNINGS: EarningsSummary = {
  today: 1240,
  week: 6840,
  month: 24380,
  todayDeliveries: 9,
  weekDeliveries: 54,
  goal: 15,
  dailyBreakdown: [
    { day: 'Mon', date: '2026-03-09', amount: 980, deliveries: 8 },
    { day: 'Tue', date: '2026-03-10', amount: 1200, deliveries: 11 },
    { day: 'Wed', date: '2026-03-11', amount: 820, deliveries: 7 },
    { day: 'Thu', date: '2026-03-12', amount: 1280, deliveries: 12 },
    { day: 'Fri', date: '2026-03-13', amount: 1080, deliveries: 9 },
    { day: 'Sat', date: '2026-03-14', amount: 1020, deliveries: 8 },
    { day: 'Sun', date: '2026-03-15', amount: 460, deliveries: 4 },
  ],
}

// ─── Notifications ────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_001',
    type: 'order',
    title: 'New Order',
    message: 'New order #5821 from Spice Garden — 2.3 km away. ₹68 earnings.',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    read: false,
    orderId: 'ord_5821',
  },
  {
    id: 'notif_002',
    type: 'pickup_ready',
    title: 'Pickup Ready',
    message: 'Order #5818 is ready for pickup at Burger Bros.',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    read: false,
    orderId: 'ord_5818',
  },
  {
    id: 'notif_003',
    type: 'rating',
    title: '5-Star Rating',
    message: 'You received a 5-star rating on order #5811 from Rohan Mehta.',
    timestamp: new Date(Date.now() - 38 * 60 * 1000),
    read: false,
    orderId: 'ord_5811',
  },
  {
    id: 'notif_004',
    type: 'promo',
    title: 'Bonus Zone Active',
    message: 'Earn 1.5x for deliveries in Connaught Place zone till 10 PM.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'notif_005',
    type: 'alert',
    title: 'Shift Reminder',
    message: 'Your evening shift (6 PM – 11 PM) starts in 2 hours.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
  },
]

// ─── Metrics ──────────────────────────────────────────────────────────────────

export const MOCK_METRICS: DashboardMetrics = {
  todayEarnings: 1240,
  todayDeliveries: 9,
  deliveryGoal: 15,
  avgRating: 4.87,
  onlineTimeMinutes: 322,
  acceptanceRate: 92,
}
