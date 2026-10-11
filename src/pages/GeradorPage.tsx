import { ArrowLeft, Check, Copy, ExternalLink, Link2, Send } from 'lucide-react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { GoldDivider } from '../components/Ornaments'
import { revelar } from '../components/motion'
import { Stage } from '../components/Stage'
import { siteConfig } from '../config'
import { ehLinkDoDrive, gerarLink, NOME_MAX } from '../lib/link'

const campo =
  'mt-2 w-full rounded-2xl border border-nude-300 bg-white/70 px-4 py-3.5 text-[0.95rem] text-pine-900 placeholder:text-pine-800/35 transition focus:border-gold-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-400/25'
const rotulo = 'block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-pine-800/70'
const botaoSecundario =
  'inline-flex items-center justify-center gap-2 rounded-full border border-pine-800/20 bg-white/60 px-4 py-3 text-sm font-semibold text-pine-800 transition hover:border-pine-800/40 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/40'

/** Página onde o estúdio informa nome + link do Drive e gera o link personalizado */
export function GeradorPage() {
  const [nome, setNome] = useState('')
  const [drive, setDrive] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [resultado, setResultado] = useState<{ nome: string; link: string } | null>(null)
  const [copiado, setCopiado] = useState(false)
  const linkRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = `Gerar link · Ensaio de Natal ${siteConfig.ano}`
  }, [])

  function gerar(e: FormEvent) {
    e.preventDefault()
    const nomeLimpo = nome.trim().replace(/\s+/g, ' ')
    const driveLimpo = drive.trim()
    if (!nomeLimpo) return setErro('Informe o nome do cliente.')
    if (!ehLinkDoDrive(driveLimpo))
      return setErro('Cole um link válido do Google Drive (começa com https://drive.google.com).')
    setErro(null)
    setCopiado(false)
    setResultado({
      nome: nomeLimpo,
      link: gerarLink(window.location.origin, { nome: nomeLimpo, driveUrl: driveLimpo }),
    })
  }

  async function copiar() {
    if (!resultado) return
    try {
      await navigator.clipboard.writeText(resultado.link)
    } catch {
      linkRef.current?.select()
      document.execCommand('copy')
    }
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2200)
  }

  function novo() {
    setNome('')
    setDrive('')
    setResultado(null)
  }

  const mensagem = resultado
    ? `Olá, ${resultado.nome}! 🎄 Seu ensaio de Natal ${siteConfig.ano} está pronto. Preparamos uma página especial para você acessar as fotos:\n${resultado.link}`
    : ''

  return (
    <Stage assinatura={false}>
      <m.p variants={revelar} className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-berry-600">
        Ensaio de Natal · {siteConfig.ano}
      </m.p>
      <m.h1 variants={revelar} className="mt-4 font-display text-4xl font-medium text-pine-900 sm:text-[2.6rem]">
        Gerar link de entrega
      </m.h1>
      <m.div variants={revelar}>
        <GoldDivider className="mt-4" />
      </m.div>

      {!resultado ? (
        <m.form variants={revelar} onSubmit={gerar} noValidate className="mt-7 space-y-5 text-left">
          <p className="text-center text-sm text-pine-800/75">
            Preencha os dados abaixo para criar a página personalizada do cliente.
          </p>
          <label className="block">
            <span className={rotulo}>Nome do cliente</span>
            <input
              className={campo}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Família Souza"
              maxLength={NOME_MAX}
              autoComplete="off"
              autoFocus
            />
          </label>
          <label className="block">
            <span className={rotulo}>Link da pasta no Google Drive</span>
            <input
              className={campo}
              value={drive}
              onChange={(e) => setDrive(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/..."
              inputMode="url"
              autoComplete="off"
            />
          </label>

          {erro && (
            <p role="alert" className="rounded-xl bg-berry-600/10 px-4 py-3 text-sm text-berry-700">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-pine-800 px-7 py-4 text-[0.95rem] font-semibold tracking-wide text-nude-50 shadow-[0_14px_30px_-12px_rgba(20,51,35,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-pine-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/60 active:translate-y-0"
          >
            <Link2 className="size-5 text-gold-300" strokeWidth={1.8} />
            Gerar link
          </button>
          <p className="text-center text-xs text-pine-800/55">
            A pasta do Drive precisa estar compartilhada como “Qualquer pessoa com o link”.
          </p>
        </m.form>
      ) : (
        <m.div
          key={resultado.link}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7"
        >
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-pine-800 text-gold-300">
            <Check className="size-6" strokeWidth={2.2} />
          </div>
          <p className="mt-4 font-display text-2xl text-pine-900">
            Link pronto para
            <span className="mt-1 block text-balance font-script text-[2.4rem] leading-tight text-berry-700">
              {resultado.nome}
            </span>
          </p>

          <input
            ref={linkRef}
            readOnly
            value={resultado.link}
            onFocus={(e) => e.target.select()}
            aria-label="Link gerado"
            className={`${campo} mt-5 text-center font-medium text-pine-800`}
          />

          <button
            type="button"
            onClick={copiar}
            className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full bg-pine-800 px-7 py-4 text-[0.95rem] font-semibold tracking-wide text-nude-50 shadow-[0_14px_30px_-12px_rgba(20,51,35,0.8)] transition duration-300 hover:bg-pine-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/60"
          >
            {copiado ? (
              <Check className="size-5 text-gold-300" />
            ) : (
              <Copy className="size-5 text-gold-300" strokeWidth={1.8} />
            )}
            {copiado ? 'Link copiado!' : 'Copiar link'}
          </button>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={resultado.link} target="_blank" rel="noopener noreferrer" className={botaoSecundario}>
              <ExternalLink className="size-4" /> Ver página
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(mensagem)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={botaoSecundario}
            >
              <Send className="size-4" /> WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={novo}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-berry-700 underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" /> Gerar outro link
          </button>
        </m.div>
      )}
    </Stage>
  )
}
