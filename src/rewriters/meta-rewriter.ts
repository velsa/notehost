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
    const { siteName, siteDescription, twitterHandle, siteImage, domain, pageToSlug } = this.siteConfig
    const page = this.url.pathname.slice(-32)
    const property = element.getAttribute('property') ?? ''
    const name = element.getAttribute('name') ?? ''

    // console.log(
    //   `${this.url}: <${element.tagName} name="${name}" property="${property}">${content}</${element.tagName}>`,
    // )

    if (element.tagName === 'title') {
      if (pageToSlug[page]) {
        element.setInnerContent(`${siteName} | ${pageToSlug[page]}`)
      } else {
        element.setInnerContent(siteName)
      }
    }

    if (property === 'og:title' || name === 'twitter:title') {
      if (pageToSlug[page]) {
        element.setAttribute('content', `${siteName} | ${pageToSlug[page]}`)
      } else {
        element.setAttribute('content', siteName)
      }
    }


    if (property === 'og:site_name' || name === 'article:author') {
      element.setAttribute('content', siteName)
    }

    if (name === 'description' || property === 'og:description' || name === 'twitter:description') {
      element.setAttribute('content', siteDescription)
    }

    if (property === 'og:url' || name === 'twitter:url') {
      element.setAttribute('content', 'https://' + domain + this.url.pathname)
    }

    if (name === 'twitter:site') {
      element.setAttribute('content', twitterHandle ?? '')
    }

    if (siteImage) {
      if (property === 'og:image' || name === 'twitter:image') {
        // console.log(`----- Image for url '${this.url.pathname}'`)
        element.setAttribute('content', siteImage)
      }
    }

    if (name === 'apple-itunes-app') {
      element.remove()
    }
  }
}
