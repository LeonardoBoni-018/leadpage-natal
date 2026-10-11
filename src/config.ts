// Configurações gerais — ajuste com os dados reais do estúdio antes do deploy.
export const siteConfig = {
  /** Nome do estúdio/fotógrafa, usado na assinatura da página */
  estudio: 'Estúdio Fotográfico',
  /** Ano do ensaio */
  ano: 2026,
  /** WhatsApp com DDI + DDD, só números (ex.: 5511999999999) — atual: +55 18 99820-7531 */
  whatsapp: '5518998207531',
}

export function whatsappLink(mensagem: string, numero: string = siteConfig.whatsapp) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
