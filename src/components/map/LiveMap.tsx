import type { Order } from '@/types'

interface LiveMapProps {
  activeOrder: Order | null
}

export function LiveMap({ activeOrder }: LiveMapProps) {
  return (
    <div style={{ height: 220, position: 'relative', overflow: 'hidden', background: '#dce8dc' }}>
      <svg
        viewBox="0 0 380 220"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Map background */}
        <rect width="380" height="220" fill="#dce8dc" />

        {/* City blocks */}
        <rect x="20" y="24" width="70" height="36" rx="2" fill="#c8d8c4" />
        <rect x="120" y="24" width="80" height="36" rx="2" fill="#c8d8c4" />
        <rect x="230" y="24" width="130" height="36" rx="2" fill="#c8d8c4" />
        <rect x="20" y="94" width="70" height="42" rx="2" fill="#c8d8c4" />
        <rect x="120" y="94" width="80" height="42" rx="2" fill="#c8d8c4" />
        <rect x="230" y="94" width="130" height="42" rx="2" fill="#c8d8c4" />
        <rect x="20" y="162" width="70" height="42" rx="2" fill="#c8d8c4" />
        <rect x="120" y="162" width="80" height="42" rx="2" fill="#c8d8c4" />
        <rect x="230" y="162" width="130" height="42" rx="2" fill="#c8d8c4" />

        {/* Roads horizontal */}
        <rect x="0" y="72" width="380" height="10" fill="white" opacity="0.65" />
        <rect x="0" y="150" width="380" height="7" fill="white" opacity="0.5" />

        {/* Roads vertical */}
        <rect x="102" y="0" width="10" height="220" fill="white" opacity="0.65" />
        <rect x="212" y="0" width="7" height="220" fill="white" opacity="0.5" />

        {/* Dashed route line */}
        {activeOrder && (
          <polyline
            points="162,99 162,77 219,77 219,42"
            stroke="#1D9E75"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="5,3"
            opacity="0.9"
          />
        )}

        {/* Driver pin */}
        <circle cx="162" cy="99" r="9" fill="#1D9E75" stroke="white" strokeWidth="2.5" />
        <circle cx="162" cy="99" r="16" fill="#1D9E75" opacity="0.15" />
        <text x="162" y="103" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">R</text>

        {/* Pickup pin */}
        {activeOrder && (
          <>
            <circle cx="219" cy="42" r="7" fill="#E24B4A" stroke="white" strokeWidth="2" />
            <text x="235" y="46" fontSize="9" fill="#991B1B" fontWeight="500">Pickup</text>
          </>
        )}

        {/* Drop pin */}
        {activeOrder && (
          <>
            <circle cx="80" cy="162" r="7" fill="#378ADD" stroke="white" strokeWidth="2" />
            <text x="92" y="166" fontSize="9" fill="#1D4ED8" fontWeight="500">Drop</text>
          </>
        )}

        {/* Location label */}
        <rect x="8" y="8" width="76" height="16" rx="3" fill="rgba(0,0,0,0.18)" />
        <text x="12" y="19" fontSize="8.5" fill="white" fontWeight="500" opacity="0.9">New Delhi, IN</text>
      </svg>
    </div>
  )
}
