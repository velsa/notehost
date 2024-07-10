import { NoteHostSiteConfigFull } from '../types'

/* eslint-disable class-methods-use-this */
export class MetaRewriter {
  siteConfig: NoteHostSiteConfigFull

  url: URL

  isRootPage: boolean

  constructor(siteConfig: NoteHostSiteConfigFull, url: URL) {
    this.siteConfig = siteConfig
    this.url = url
    this.isRootPage = this.siteConfig.pageToSlug[this.url.pathname.slice(1)] === ''
  }

  element(element: Element) {
    const { siteName, siteDescription, twitterHandle, siteImage, domain, pageToSlug, pageMetadata } = this.siteConfig
    const page = this.url.pathname.slice(-32)
    const property = element.getAttribute('property') ?? ''
    const name = element.getAttribute('name') ?? ''
    const content = element.getAttribute('content') ?? ''

    // console.log(
    //   `${this.url}: <${element.tagName} name="${name}" property="${property}">${content}</${element.tagName}>`,
    // )

    if (element.tagName === 'title') {
      const pageTitle = pageMetadata[page]?.title ?? removeNotionAds(content)

      element.setInnerContent(pageTitle)
    }

    if (property === 'og:title' || name === 'twitter:title') {
      const pageTitle = pageMetadata[page]?.title ?? removeNotionAds(content)

      element.setAttribute('content', pageTitle)
    }

    if (property === 'og:site_name') {
      element.setAttribute('content', siteName)
    }

    if (name === 'article:author') {
      const pageAuthor = pageMetadata[page]?.author ?? content

      element.setAttribute('content', pageAuthor)
    }

    if (name === 'description' || property === 'og:description' || name === 'twitter:description') {
      if (this.isRootPage) {
        element.setAttribute('content', siteDescription)
      } else {
        const pageDescription = pageMetadata[page]?.description ?? removeNotionAds(content)

        element.setAttribute('content', pageDescription)
      }
    }

    if (property === 'og:url' || name === 'twitter:url') {
      if (this.isRootPage) {
        element.setAttribute('content', `https://${domain}/`)
      } else if (pageToSlug[page]) {
        element.setAttribute('content', `https://${domain}/${pageToSlug[page]}`)
      } else {
        element.setAttribute('content', `https://${domain}/${page}`)
      }
    }

    if (name === 'twitter:site') {
      if (twitterHandle) {
        element.setAttribute('content', `${twitterHandle}`)
      } else {
        element.remove()
      }
    }

    if (property === 'og:image' || name === 'twitter:image') {
      if (this.isRootPage && siteImage) {
        // console.log(`----- Image for url '${this.url.pathname}: ${siteImage}'`)
        element.setAttribute('content', siteImage)
      } else {
        const pageImage = pageMetadata[page]?.image ?? content
        // console.log(`----- Image for url '${this.url.pathname}: ${pageImage}'`)

        element.setAttribute('content', pageImage)
      }
    }

    if (name === 'apple-itunes-app') {
      element.remove()
    }
  }
}

function removeNotionAds(text: string) {
  return text
    .replace(' | Built with Notion', '')
    .replace(' | Notion', '')
    .replace('Built with Notion, the all-in-one connected workspace with publishing capabilities.', '')
}
