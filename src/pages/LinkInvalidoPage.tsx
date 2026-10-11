import * as m from 'motion/react-m'
import { Holly } from '../components/Ornaments'
import { revelar } from '../components/motion'
import { Stage } from '../components/Stage'

/** Exibida quando o link do cliente foi cortado ou alterado */
export function LinkInvalidoPage() {
  return (
    <Stage>
      <m.div variants={revelar}>
        <Holly className="mx-auto w-28" />
      </m.div>
      <m.h1 variants={revelar} className="mt-4 font-display text-3xl font-medium text-pine-900">
        Link incompleto
      </m.h1>
      <m.p variants={revelar} className="mx-auto mt-3 max-w-xs text-pretty text-[0.95rem] text-pine-800/80">
        Confira se o link foi copiado por inteiro e tente abrir novamente.
      </m.p>
    </Stage>
  )
}
