/** Ramo de azevinho: duas folhas e três frutinhas */
export function Holly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="folha-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f6b47" />
          <stop offset="1" stopColor="#143323" />
        </linearGradient>
        <linearGradient id="folha-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24583d" />
          <stop offset="1" stopColor="#0e2418" />
        </linearGradient>
        <radialGradient id="fruta" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#d9474f" />
          <stop offset="0.6" stopColor="#a8232d" />
          <stop offset="1" stopColor="#741620" />
        </radialGradient>
      </defs>
      {/* folha esquerda */}
      <path
        d="M70 36 C58 22 38 14 8 22 C14 26 12 30 18 32 C14 36 20 38 22 42 C40 48 58 44 70 36Z"
        fill="url(#folha-a)"
      />
      <path d="M70 36 C52 31 32 28 10 23" stroke="#4d8a63" strokeWidth="1.2" fill="none" opacity="0.7" />
      {/* folha direita */}
      <path
        d="M70 36 C82 22 102 14 132 22 C126 26 128 30 122 32 C126 36 120 38 118 42 C100 48 82 44 70 36Z"
        fill="url(#folha-b)"
      />
      <path d="M70 36 C88 31 108 28 130 23" stroke="#3f7a55" strokeWidth="1.2" fill="none" opacity="0.7" />
      {/* frutinhas */}
      <circle cx="61" cy="38" r="8" fill="url(#fruta)" />
      <circle cx="79" cy="38" r="8" fill="url(#fruta)" />
      <circle cx="70" cy="27" r="8" fill="url(#fruta)" />
      <circle cx="58" cy="35" r="1.8" fill="#fff" opacity="0.55" />
      <circle cx="76" cy="35" r="1.8" fill="#fff" opacity="0.55" />
      <circle cx="67" cy="24" r="1.8" fill="#fff" opacity="0.55" />
    </svg>
  )
}

/** Divisor dourado com estrela no centro */
export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-400" />
      <svg viewBox="0 0 24 24" className="size-3.5 text-gold-500">
        <path fill="currentColor" d="M12 0 14.4 9.6 24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4Z" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-400" />
    </div>
  )
}
