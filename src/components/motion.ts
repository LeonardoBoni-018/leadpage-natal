import type { Variants } from 'motion/react'

/** Entrada em cascata dos elementos do cartão */
export const revelar: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
