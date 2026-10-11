import { lerToken, PREFIXO_ROTA } from './lib/link'
import { ClientePage } from './pages/ClientePage'
import { GeradorPage } from './pages/GeradorPage'
import { LinkInvalidoPage } from './pages/LinkInvalidoPage'

// /f/<token> -> página do cliente | qualquer outra rota -> gerador
const { pathname } = window.location
const token = pathname.startsWith(PREFIXO_ROTA) ? pathname.slice(PREFIXO_ROTA.length).replace(/\/$/, '') : null
const entrega = token ? lerToken(token) : null

export default function App() {
  if (token === null) return <GeradorPage />
  if (!entrega) return <LinkInvalidoPage />
  return <ClientePage {...entrega} />
}
