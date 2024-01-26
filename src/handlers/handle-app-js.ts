import { NoteHostSiteConfigFull } from '../types'

export async function handleAppJs(url: URL, siteConfig: NoteHostSiteConfigFull) {
  const { domain } = siteConfig
  const response = await fetch(url.toString())
  const body = await response.text()
  const ret = new Response(body.replace(/www.notion.so/g, domain).replace(/notion.so/g, domain), response)

  ret.headers.set('Content-Type', 'application/x-javascript')

  return ret
}
