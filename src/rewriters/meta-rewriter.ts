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
    const { siteName, siteDescription, siteImage, domain } = this.siteConfig
    const property = element.getAttribute('property') ?? ''
    const name = element.getAttribute('name') ?? ''
    let content = element.getAttribute('content') ?? ''

    content = content.replace(' | Built with Notion', '')
    content = content.replace(' | Notion', '')
    console.log(
      `${this.url}: <${element.tagName} name="${name}" property="${property}">${content}</${element.tagName}>`,
    )

    if (element.tagName === 'title') {
      element.setInnerContent(content)
    }

    if (property === 'og:title' || name === 'twitter:title') {
      element.setAttribute('content', content)
    }

    if (property === 'og:site_name' || name === 'article:author') {
      element.setAttribute('content', siteName)
    }

    if (name === 'description' || property === 'og:description' || name === 'twitter:description') {
      if (this.isRootPage) {
        element.setAttribute('content', siteDescription)
      } else {
        element.setAttribute(
          'content',
          content.replace('Built with Notion, the all-in-one connected workspace with publishing capabilities.', ''),
        )
      }
    }

    if (property === 'og:url' || name === 'twitter:url') {
      element.setAttribute('content', domain)
    }

    if (siteImage) {
      if (property === 'og:image' || name === 'twitter:image') {
        if (this.isRootPage) {
          // console.log(`----- Image for url '${this.url.pathname}'`)
          element.setAttribute('content', siteImage)
        }
      }
    }

    if (name === 'apple-itunes-app') {
      element.remove()
    }
  }
}
