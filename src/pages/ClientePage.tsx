import * as m from 'motion/react-m'
import { useEffect } from 'react'
import { DriveButton, WhatsAppButton } from '../components/Buttons'
import { GoldDivider, Holly } from '../components/Ornaments'
import { revelar } from '../components/motion'
import { Stage } from '../components/Stage'
import { siteConfig, whatsappLink } from '../config'
import type { Entrega } from '../lib/link'

export function ClientePage({ nome, driveUrl }: Entrega) {
  const { ano } = siteConfig
  const mensagemWhats = `Olá! Sou ${nome}, fiz o ensaio de Natal ${ano} e gostaria de informações sobre mais fotos.`

  useEffect(() => {
    document.title = `Olá, ${nome}! · Ensaio de Natal ${ano}`
  }, [nome, ano])

  return (
    <Stage brilhos>
      <m.p variants={revelar} className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-berry-600">
        Ensaio de Natal · {ano}
      </m.p>

      <m.div variants={revelar}>
        <Holly className="mx-auto mt-6 w-28 animate-[balanco_5s_ease-in-out_infinite] origin-top drop-shadow-[0_6px_10px_rgba(20,51,35,0.25)] sm:w-32" />
      </m.div>

      <m.h1 variants={revelar} className="mt-5">
        <span className="block font-display text-3xl italic text-pine-800 sm:text-4xl">Olá,</span>
        <span className="mt-1 block text-balance px-2 pb-2 font-script text-[clamp(3.1rem,14vw,4.75rem)] leading-[1.05] text-berry-700 animate-[brilho-texto_3.5s_ease-in-out_infinite]">
          {nome}!
        </span>
      </m.h1>

      <m.div variants={revelar}>
        <GoldDivider className="mt-3" />
      </m.div>

      <m.p
        variants={revelar}
        className="mx-auto mt-6 max-w-sm text-pretty font-display text-[1.35rem] leading-snug text-pine-900 sm:text-2xl"
      >
        Gostaríamos de agradecer você e a sua família por nos dar a oportunidade de registrar o ensaio de Natal {ano}.
      </m.p>

      <m.div variants={revelar} className="mt-8">
        <p className="text-sm text-pine-800/75">No link abaixo você consegue acessar as fotos</p>
        <div className="mt-3">
          <DriveButton href={driveUrl} />
        </div>
      </m.div>

      <m.p variants={revelar} className="mx-auto mt-8 max-w-sm text-pretty text-[0.95rem] leading-relaxed text-pine-800/85">
        Esperamos que goste. Foi tudo pensado em cada detalhe e feito com muito carinho para vocês.
      </m.p>

      <m.div variants={revelar} className="mt-8 border-t border-nude-300/70 pt-7">
        <p className="text-sm text-pine-800/75">Para informações sobre mais fotos, entre em contato no WhatsApp</p>
        <div className="mt-3">
          <WhatsAppButton href={whatsappLink(mensagemWhats)} />
        </div>
      </m.div>
    </Stage>
  )
}
