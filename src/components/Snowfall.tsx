import { useEffect, useRef } from 'react'

interface Flake {
  x: number
  y: number
  r: number
  vy: number
  phase: number
  alpha: number
}

/** Neve leve em canvas. Fica estática para quem prefere menos movimento. */
export function Snowfall() {
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

    const criar = (topo: boolean): Flake => {
      const r = 0.6 + Math.random() * 2.2
      return {
        x: Math.random() * w,
        y: topo ? -10 : Math.random() * h,
        r,
        vy: 0.15 + r * 0.28,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.55,
      }
    }

    const desenhar = () => {
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 249, 240, ${f.alpha})`
        ctx.fill()
      }
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
        const total = Math.round(Math.min(120, (w * h) / 12000))
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
      desenhar()
      raf = requestAnimationFrame(animar)
    }

    redimensionar()
    window.addEventListener('resize', redimensionar)
    if (!reduce) raf = requestAnimationFrame(animar)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', redimensionar)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full" />
}
