# SwiftBite — Driver Dashboard

A production-ready food delivery driver dashboard built with React 18 + TypeScript + Vite.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Bundler | Vite 5 |
| Icons | Lucide React |
| Styling | CSS Variables (no CSS-in-JS framework) |
| Fonts | DM Sans + DM Mono (Google Fonts) |
| State | React hooks (no external state library) |

## Project Structure

```
swiftbite-driver/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── src/
    ├── main.tsx               # Entry point
    ├── App.tsx                # Root component, wires all hooks
    ├── index.css              # Global CSS variables & reset
    ├── types/
    │   └── index.ts           # All TypeScript interfaces & types
    ├── data/
    │   └── mockData.ts        # Seed data (replace with real API calls)
    ├── hooks/
    │   └── index.ts           # useDriver, useOrders, useEarnings, useNotifications, useMetrics, useNavigation
    ├── utils/
    │   └── helpers.ts         # Formatting, status helpers, greeting, date utils
    └── components/
        ├── index.ts           # Barrel exports
        ├── layout/
        │   ├── Sidebar.tsx        # Navigation sidebar with driver card
        │   ├── Topbar.tsx         # Top bar with status toggle & notifications
        │   ├── DashboardPage.tsx  # Dashboard layout — composes all panels
        │   └── PlaceholderPage.tsx # Stub pages for non-dashboard routes
        ├── orders/
        │   ├── OrderList.tsx      # Queue of orders with accept/pickup/deliver actions
        │   └── ActiveOrderPanel.tsx # Active delivery card with action buttons
        ├── map/
        │   └── LiveMap.tsx        # SVG live map with driver/pickup/drop pins
        ├── earnings/
        │   └── EarningsPanel.tsx  # Weekly bar chart + summary stats
        ├── notifications/
        │   └── NotificationsPanel.tsx # Notification feed with read/unread state
        └── ui/
            ├── MetricCard.tsx     # KPI card (earnings, deliveries, rating, time)
            └── Panel.tsx          # Reusable card panel wrapper
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## Features

- **Live order queue** — Accept, pick up, and mark orders as delivered
- **Active delivery tracker** — Current order with ETA, map, navigate & call buttons
- **SVG live map** — Driver position, pickup pin, drop pin, and dashed route line
- **Metrics cards** — Daily earnings, delivery count with goal progress, rating, online time
- **Daily goal progress bar** — Color changes from amber → green as goal approaches
- **Weekly earnings chart** — Bar chart with today highlighted
- **Notification feed** — Unread badges, mark-as-read, mark-all-read
- **Online/Offline toggle** — Driver status switch in topbar and sidebar
- **Navigation** — 7-page sidebar nav with active state and badge counters

## Connecting to a Real API

All mock data lives in `src/data/mockData.ts`. Replace with real API calls inside `src/hooks/index.ts`:

```typescript
// Example: replace useState(MOCK_ORDERS) with:
const [orders, setOrders] = useState<Order[]>([])

useEffect(() => {
  fetch('/api/driver/orders')
    .then(r => r.json())
    .then(setOrders)
}, [])
```

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_BASE_URL=https://your-api.example.com
VITE_GOOGLE_MAPS_KEY=your_maps_api_key
```

Access in code: `import.meta.env.VITE_API_BASE_URL`
