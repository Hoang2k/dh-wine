import { BottleShape, WineType } from '@/types/wine'
import { cn } from '@/lib/utils'

/** Glass + liquid colouring per wine style. */
const palette: Record<WineType, { glass: string; shade: string; foil: string }> = {
  red: { glass: '#3a0f1b', shade: '#14060a', foil: '#a88332' },
  white: { glass: '#c9bf7a', shade: '#7d7440', foil: '#d9c88a' },
  rose: { glass: '#e7a7a1', shade: '#b46e6a', foil: '#f1d6d1' },
  sparkling: { glass: '#1f2b1d', shade: '#0b100a', foil: '#ffcc00' },
  sweet: { glass: '#b07a26', shade: '#5f3d0d', foil: '#3a2a10' },
}

const shapes: Record<BottleShape, { path: string; label: [number, number, number, number]; capsule: number }> = {
  bordeaux: {
    path: 'M50 8h20v110c0 18 28 26 28 52v206c0 8-5 12-12 12H34c-7 0-12-4-12-12V170c0-26 28-34 28-52z',
    label: [26, 228, 68, 104],
    capsule: 62,
  },
  burgundy: {
    path: 'M51 8h18v100c0 40 31 52 31 86v182c0 8-5 12-12 12H32c-7 0-12-4-12-12V194c0-34 31-46 31-86z',
    label: [24, 232, 72, 104],
    capsule: 58,
  },
  champagne: {
    path: 'M50 8h20v96c0 44 34 54 34 90v182c0 8-5 12-12 12H28c-7 0-12-4-12-12V194c0-36 34-46 34-90z',
    label: [20, 236, 80, 96],
    capsule: 120,
  },
}

type WineBottleProps = {
  id: string
  type: WineType
  shape: BottleShape
  producer?: string
  vintage?: number | 'NV'
  className?: string
}

/** Studio-style bottle render used when no packshot photo is available. */
export default function WineBottle({ id, type, shape, producer, vintage, className }: WineBottleProps) {
  const c = palette[type]
  const s = shapes[shape]
  const [lx, ly, lw, lh] = s.label
  const gid = `wb-${id}`
  const monogram = producer?.replace(/^(Château|Domaine|Tenuta|Cantina|Viña|Bodega|Maison|Weingut|Villa)\s+/i, '').charAt(0) ?? 'Đ'

  return (
    <svg
      viewBox="0 0 120 410"
      role="img"
      aria-label={producer ? `Chai ${producer}` : 'Chai rượu vang'}
      className={cn('h-full w-auto drop-shadow-[0_24px_24px_rgba(25,25,25,0.22)]', className)}
    >
      <defs>
        <linearGradient id={`${gid}-glass`} x1="0" x2="1">
          <stop offset="0" stopColor={c.shade} />
          <stop offset="0.35" stopColor={c.glass} />
          <stop offset="0.7" stopColor={c.glass} />
          <stop offset="1" stopColor={c.shade} />
        </linearGradient>
        <linearGradient id={`${gid}-shine`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${gid}-clip`}>
          <path d={s.path} />
        </clipPath>
      </defs>

      <ellipse cx="60" cy="398" rx="44" ry="5" fill="#191919" opacity="0.12" />
      <path d={s.path} fill={`url(#${gid}-glass)`} />

      <g clipPath={`url(#${gid}-clip)`}>
        <rect x="0" y="0" width="120" height={s.capsule} fill={c.foil} />
        <rect x="0" y={s.capsule - 4} width="120" height="4" fill="#000" opacity="0.18" />
        <rect x="36" y="0" width="7" height="410" fill={`url(#${gid}-shine)`} opacity="0.5" />
        <rect x="86" y="0" width="3" height="410" fill="#fff" opacity="0.08" />

        <rect x={lx} y={ly} width={lw} height={lh} fill="#f8f6f0" />
        <rect x={lx + 4} y={ly + 4} width={lw - 8} height={lh - 8} fill="none" stroke="#c9a400" strokeWidth="0.6" />
        <text x="60" y={ly + lh * 0.42} textAnchor="middle" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }} fontSize="22" fill="#191919">
          {monogram}
        </text>
        <line x1={lx + 16} x2={lx + lw - 16} y1={ly + lh * 0.55} y2={ly + lh * 0.55} stroke="#ffcc00" strokeWidth="1.2" />
        <text x="60" y={ly + lh * 0.72} textAnchor="middle" style={{ fontFamily: "var(--font-be-vietnam), sans-serif" }} fontSize="5" letterSpacing="1.4" fill="#a88332">
          {vintage === 'NV' ? 'CUVÉE' : vintage ?? ''}
        </text>
      </g>
    </svg>
  )
}
