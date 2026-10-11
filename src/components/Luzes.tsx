const CORES = ['#ff3b4a', '#f4cd78', '#3fd17f', '#fff1d6']
const TOTAL = 14

/** Fio de luzes de Natal piscando no topo da página */
export function Luzes() {
  const bulbos = Array.from({ length: TOTAL }, (_, i) => {
    const x = (i + 0.5) / TOTAL
    // O fio faz uma curva suave (catenária simplificada) entre as pontas
    const y = 6 + Math.sin(x * Math.PI) * 14
    return { x, y, cor: CORES[i % CORES.length], atraso: (i % 5) * 0.45 }
  })

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-30 h-14 overflow-hidden">
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full">
        <path d="M0 4 Q50 36 100 4" fill="none" stroke="#0a1a11" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {bulbos.map((b, i) => (
        <span
          key={i}
          className="absolute size-3 -translate-x-1/2 rounded-full animate-[piscar_2.2s_ease-in-out_infinite]"
          style={{
            left: `${b.x * 100}%`,
            top: `${b.y * 1.15}px`,
            backgroundColor: b.cor,
            boxShadow: `0 0 8px 2px ${b.cor}aa`,
            animationDelay: `${b.atraso}s`,
          }}
        />
      ))}
    </div>
  )
}
