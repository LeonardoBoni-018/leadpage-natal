import { useEffect, useRef } from 'react'

interface Flake {
  x: number
  y: number
  r: number
  vy: number
  phase: number
  alpha: number
}

/** Neve leve em canvas (ou, com `brilhos`, brilhos vermelhos natalinos caindo). Fica estática para quem prefere menos movimento. */
export function Snowfall({ brilhos = false }: { brilhos?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let flakes: Flake[] = []

    // Brilho vermelho pré-renderizado (halo suave + núcleo claro), reaproveitado em todas as partículas
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const sctx = sprite.getContext('2d')
    if (sctx) {
      const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, 'rgba(255, 214, 214, 1)')
      g.addColorStop(0.18, 'rgba(255, 70, 80, 0.95)')
      g.addColorStop(0.5, 'rgba(210, 25, 45, 0.35)')
      g.addColorStop(1, 'rgba(190, 10, 30, 0)')
      sctx.fillStyle = g
      sctx.fillRect(0, 0, 64, 64)
    }

    const criar = (topo: boolean): Flake => {
      const r = brilhos ? 3 + Math.random() * 6 : 0.6 + Math.random() * 2.2
      return {
        x: Math.random() * w,
        y: topo ? -10 : Math.random() * h,
        r,
        vy: brilhos ? 0.35 + Math.random() * 0.7 : 0.15 + r * 0.28,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.55,
      }
    }

    const desenhar = (tempo = 0) => {
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        if (brilhos) {
          // Cintilar: o brilho pulsa suavemente
          const pulso = 0.65 + 0.35 * Math.sin(tempo / 500 + f.phase * 3)
          ctx.globalAlpha = f.alpha * pulso
          ctx.drawImage(sprite, f.x - f.r * 2, f.y - f.r * 2, f.r * 4, f.r * 4)
          continue
        }
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 249, 240, ${f.alpha})`
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const redimensionar = () => {
      const larguraMudou = window.innerWidth !== w
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // No celular a barra de endereço muda só a altura; não recria a neve nesse caso
      if (larguraMudou) {
        const total = Math.round(Math.min(brilhos ? 45 : 120, (w * h) / (brilhos ? 22000 : 12000)))
        flakes = Array.from({ length: total }, () => criar(false))
      }
      desenhar()
    }

    const animar = (t: number) => {
      for (const f of flakes) {
        f.y += f.vy
        f.x += Math.sin(t / 1800 + f.phase) * 0.35
        if (f.y > h + 10) Object.assign(f, criar(true))
      }
      desenhar(t)
      raf = requestAnimationFrame(animar)
    }

    redimensionar()
    window.addEventListener('resize', redimensionar)
    if (!reduce) raf = requestAnimationFrame(animar)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', redimensionar)
    }
  }, [brilhos])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full" />
}
