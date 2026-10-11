import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { siteConfig } from '../config'
import { Snowfall } from './Snowfall'

/** Fundo verde com brilhos e neve + cartão nude centralizado */
export function Stage({ children, assinatura = true }: { children: ReactNode; assinatura?: boolean }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-dvh overflow-hidden bg-pine-950">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,180,131,0.22),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-berry-700/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/3 size-[26rem] rounded-full bg-pine-600/30 blur-3xl"
          />
          <Snowfall />

          <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center px-4 py-10 sm:py-16">
            <m.article
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="paper relative w-full rounded-[2rem] bg-nude-50 px-6 pb-10 pt-10 text-center shadow-[0_40px_100px_-30px_rgba(0,0,0,0.75)] sm:px-12 sm:pb-12 sm:pt-12"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2.5 rounded-[1.6rem] border border-gold-400/45"
              />
              <m.div
                className="relative"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
              >
                {children}
              </m.div>
            </m.article>

            {assinatura && (
              <m.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="mt-8 text-center text-sm text-nude-200/70"
              >
                <p className="font-display text-lg italic text-nude-100/85">Com carinho, {siteConfig.estudio}</p>
                <p className="mt-1 tracking-wide">Feliz Natal e um próspero {siteConfig.ano + 1}</p>
              </m.footer>
            )}
          </main>
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
