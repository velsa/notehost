/* eslint-disable no-undef */
import { handleFavicon } from './handlers/handle-favicon'
import { handleNotionAsset } from './handlers/handle-other'
import { handleApi, handleAppJs, handleJs, handleOptions, handleSitemap } from './handlers/index'
import { siteConfig } from './reverse-proxy-init'
import { BodyRewriter, HeadRewriter, MetaRewriter } from './rewriters/index'
import { NoteHostSiteConfigFull } from './types'

export async function reverseProxy(request: Request) {
  if (!siteConfig) {
    throw new Error('Site config is not initialized. Please call initializeReverseProxy() first.')
  }

  const { domain, slugToPage, siteIcon } = siteConfig

  if (request.method === 'OPTIONS') {
    return handleOptions(request)
  }

  const url = new URL(request.url)
  const subDomain = url.hostname.split('.')[0]

  if (url.hostname === domain) {
    url.hostname = siteConfig.notionDomain ? `${siteConfig.notionDomain}.notion.site` : 'www.notion.so'

    // Handle special Notion routes
    if (url.pathname === '/robots.txt') {
      return new Response(`Sitemap: https://${domain}/sitemap.xml`)
    }

    if (url.pathname === '/sitemap.xml') {
      return handleSitemap(request, siteConfig)
    }

    if (url.pathname.startsWith('/app') && url.pathname.endsWith('js')) {
      return handleAppJs(url, siteConfig)
    }

    if (url.pathname.startsWith('/api')) {
      return handleApi(url, request)
    }

    if (url.pathname.endsWith('.js')) {
      return handleJs(url)
    }

    if (url.pathname.endsWith('favicon.ico') && siteIcon) {
      return handleFavicon(url, siteIcon)
    }

    if (
      url.pathname.startsWith('/_assets') ||
      url.pathname.startsWith('/image') ||
      url.pathname.startsWith('/f/refresh') ||
      url.pathname.match(/\.[a-zA-Z]{2,4}$/)
    ) {
      return handleNotionAsset(url)
    }

    // Handle slugs, from site-config and from KV
    const slug = url.pathname.slice(1)
    const page = slugToPage[slug]

    if (page) {
      // console.log(`Redirecting ${slug} to https://${domain}/${page}`);

      return Response.redirect(`https://${domain}/${page}`, 301)
    } else if (slug.length !== 32 && !slug.match(/^[0-9a-f]+$/i)) {
      if (siteConfig.fof?.page?.length) {
        return Response.redirect(`https://${domain}/${siteConfig.fof.page}`, 301)
      } else {
        console.error('!! Page Not found (404)', url.pathname)

        return new Response('NoteHost: Page Not found (404).', { status: 404 })
      }
    }
  } else if (subDomain && siteConfig.subDomains) {
    const sub = siteConfig.subDomains[subDomain]

    if (sub) {
      // console.log(`Redirecting ${url.hostname} to ${sub.redirect}`)

      return Response.redirect(sub.redirect, 301)
    }
  }

  const response = await fetch(url.toString(), {
    body: request.body,
    headers: request.headers,
    method: request.method,
  })
  const ret = new Response(response.body as BodyInit, response)

  ret.headers.delete('Content-Security-Policy')
  ret.headers.delete('X-Content-Security-Policy')

  return appendJavascript(ret, url, siteConfig)
}

async function appendJavascript(res: Response, url: URL, config: NoteHostSiteConfigFull) {
  // eslint-disable-next-line no-undef
  return new HTMLRewriter()
    .on('title', new MetaRewriter(config, url))
    .on('meta', new MetaRewriter(config, url))
    .on('head', new HeadRewriter(config))
    .on('body', new BodyRewriter(config))
    .transform(res)
}
