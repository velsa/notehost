import { NoteHostSiteConfigFull } from '../types'

export async function handleAppJs(url: URL, siteConfig: NoteHostSiteConfigFull) {
  const { domain } = siteConfig
  const response = await fetch(url.toString())
  const body = await response.text()
  const siteRegex = new RegExp(
    siteConfig.notionDomain ? `${siteConfig.notionDomain}.notion.site` : 'www.notion.so',
    'g',
  )
  const ret = new Response(body.replace(siteRegex, domain).replace(/notion.so/g, domain), response)

  ret.headers.set('Content-Type', 'application/x-javascript')

  return ret
}
