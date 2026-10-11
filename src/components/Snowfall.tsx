import { useEffect, useRef } from 'react'

type Tipo = 'neve' | 'rubi' | 'ouro'

interface Particula {
  tipo: Tipo
  x: number
  y: number
  r: number
  vy: number
  phase: number
  alpha: number
}

const CORES: Record<Tipo, [string, string, string]> = {
  neve: ['rgba(255,255,255,1)', 'rgba(255,250,242,0.85)', 'rgba(255,250,242,0)'],
  rubi: ['rgba(255,214,214,1)', 'rgba(255,60,75,0.9)', 'rgba(200,15,35,0)'],
  ouro: ['rgba(255,250,225,1)', 'rgba(244,205,120,0.9)', 'rgba(212,170,90,0)'],
}

/** Sprite pré-renderizado: núcleo claro + halo suave. Evita shadowBlur, que pesa no celular. */
function criarSprite(tipo: Tipo) {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  if (g) {
    const [a, b, d] = CORES[tipo]
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, a)
    grad.addColorStop(tipo === 'neve' ? 0.3 : 0.2, b)
    grad.addColorStop(1, d)
    g.fillStyle = grad
    g.fillRect(0, 0, 64, 64)
    if (tipo === 'ouro') {
      // cintilação em cruz
      g.fillStyle = 'rgba(255,248,220,0.95)'
      g.fillRect(31, 6, 2, 52)
      g.fillRect(6, 31, 52, 2)
    }
  }
  return c
}

/**
 * Neve em canvas. Com `festa`, o canvas fica por cima do cartão e mistura neve brilhante
 * com cintilações vermelhas e douradas. Respeita "reduzir movimento" e pausa com a aba oculta.
 */
export function Snowfall({ festa = false }: { festa?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sprites = { neve: criarSprite('neve'), rubi: criarSprite('rubi'), ouro: criarSprite('ouro') }
    let w = 0
    let h = 0
    let raf = 0
    let particulas: Particula[] = []

    const sortearTipo = (): Tipo => {
      if (!festa) return 'neve'
      const s = Math.random()
      return s < 0.5 ? 'neve' : s < 0.78 ? 'rubi' : 'ouro'
    }

    const criar = (topo: boolean): Particula => {
      const tipo = sortearTipo()
      const r = tipo === 'neve' ? (festa ? 1.5 + Math.random() * 3.5 : 0.6 + Math.random() * 2.2) : 2.5 + Math.random() * 4.5
      return {
        tipo,
        x: Math.random() * w,
        y: topo ? -20 : Math.random() * h,
        r,
        vy: festa ? 0.4 + Math.random() * 0.9 : 0.15 + r * 0.28,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.4 + Math.random() * 0.5,
      }
    }

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particulas) {
        const cintila = p.tipo === 'neve' ? 1 : 0.55 + 0.45 * Math.sin(t / 380 + p.phase * 3)
        ctx.globalAlpha = (festa ? p.alpha : p.alpha * 0.8) * cintila
        const lado = p.r * (p.tipo === 'neve' ? 3 : 4)
        ctx.drawImage(sprites[p.tipo], p.x - lado / 2, p.y - lado / 2, lado, lado)
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
      // No celular a barra de endereço muda só a altura; não recria as partículas nesse caso
      if (larguraMudou) {
        const total = Math.round(Math.min(festa ? 90 : 120, (w * h) / (festa ? 7000 : 12000)))
        particulas = Array.from({ length: total }, () => criar(false))
      }
      desenhar(0)
    }

    const animar = (t: number) => {
      for (const p of particulas) {
        p.y += p.vy
        p.x += Math.sin(t / 1800 + p.phase) * 0.4
        if (p.y > h + 20) Object.assign(p, criar(true))
      }
      desenhar(t)
      raf = requestAnimationFrame(animar)
    }

    const alternar = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(animar)
    }

    redimensionar()
    window.addEventListener('resize', redimensionar)
    document.addEventListener('visibilitychange', alternar)
    alternar()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', redimensionar)
      document.removeEventListener('visibilitychange', alternar)
    }
  }, [festa])

  // Em festa fica acima do cartão (z-20); senão, atrás dele
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed inset-0 size-full ${festa ? 'z-20' : 'z-0'}`}
    />
  )
}
