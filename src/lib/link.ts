/**
 * Os dados da entrega (nome + link do Drive) viajam dentro do próprio link:
 *   https://seu-dominio.com.br/f/<token>
 * Não há banco de dados — o link gerado funciona na hora, sem novo deploy.
 *
 * Para encurtar, links de pasta/arquivo do Drive viram só o ID ("f<id>" / "d<id>");
 * qualquer outro formato do Google Drive vai inteiro ("u<url>").
 */

export interface Entrega {
  nome: string
  driveUrl: string
}

export const PREFIXO_ROTA = '/f/'
export const NOME_MAX = 60

const PASTA = /^https:\/\/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([\w-]+)\/?(?:\?(?:usp=\w+)?)?$/
const ARQUIVO = /^https:\/\/drive\.google\.com\/file\/d\/([\w-]+)(?:\/\w*)?\/?(?:\?(?:usp=\w+)?)?$/

/** Só aceita links do Google Drive/Docs — impede que o gerador vire redirecionador para outros sites */
export function ehLinkDoDrive(url: string) {
  try {
    const { protocol, hostname } = new URL(url)
    return protocol === 'https:' && (hostname === 'drive.google.com' || hostname === 'docs.google.com')
  } catch {
    return false
  }
}

function paraBase64Url(texto: string) {
  let binario = ''
  for (const byte of new TextEncoder().encode(texto)) binario += String.fromCharCode(byte)
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function deBase64Url(token: string) {
  const b64 = token.replace(/-/g, '+').replace(/_/g, '/')
  const binario = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4))
  return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binario, (c) => c.charCodeAt(0)))
}

function comprimirDrive(url: string) {
  const pasta = url.match(PASTA)
  if (pasta) return `f${pasta[1]}`
  const arquivo = url.match(ARQUIVO)
  if (arquivo) return `d${arquivo[1]}`
  return `u${url}`
}

function expandirDrive(ref: string) {
  const valor = ref.slice(1)
  if (ref[0] === 'f') return `https://drive.google.com/drive/folders/${valor}`
  if (ref[0] === 'd') return `https://drive.google.com/file/d/${valor}/view`
  return valor
}

export function gerarLink(origem: string, { nome, driveUrl }: Entrega) {
  const token = paraBase64Url(JSON.stringify([nome, comprimirDrive(driveUrl)]))
  return `${origem}${PREFIXO_ROTA}${token}`
}

/** Lê o token da URL. Retorna null se estiver incompleto, adulterado ou apontar para fora do Drive. */
export function lerToken(token: string): Entrega | null {
  try {
    const dados: unknown = JSON.parse(deBase64Url(token))
    if (!Array.isArray(dados) || typeof dados[0] !== 'string' || typeof dados[1] !== 'string') return null
    const nome = dados[0].trim().slice(0, NOME_MAX)
    const driveUrl = expandirDrive(dados[1])
    if (!nome || !ehLinkDoDrive(driveUrl)) return null
    return { nome, driveUrl }
  } catch {
    return null
  }
}
