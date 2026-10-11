import { ArrowUpRight, Images, MessageCircle } from 'lucide-react'

const base =
  'group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.95rem] font-semibold tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-4 sm:w-auto'

/** Botão principal: abre a pasta do Drive */
export function DriveButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-pine-800 text-nude-50 shadow-[0_14px_30px_-12px_rgba(20,51,35,0.8)] hover:-translate-y-0.5 hover:bg-pine-700 hover:shadow-[0_20px_40px_-14px_rgba(20,51,35,0.9)] focus-visible:ring-gold-400/60 active:translate-y-0`}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <Images className="size-5 text-gold-300" strokeWidth={1.8} />
      <span className="relative">Acessar minhas fotos</span>
      <ArrowUpRight
        className="size-4 text-gold-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </a>
  )
}

/** Botão secundário: WhatsApp com mensagem já preenchida */
export function WhatsAppButton({ href, label = 'Falar no WhatsApp' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border border-berry-600/30 bg-white/40 py-3.5 text-berry-700 hover:border-berry-600/60 hover:bg-berry-600 hover:text-nude-50 focus-visible:ring-berry-500/30`}
    >
      <MessageCircle className="size-5" strokeWidth={1.8} />
      {label}
    </a>
  )
}
