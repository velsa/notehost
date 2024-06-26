import { NoteHostSiteConfig, NoteHostSiteConfigFull } from './types'

export let siteConfig: NoteHostSiteConfigFull = {} as NoteHostSiteConfigFull

export function initializeReverseProxy(siteConfigUser: NoteHostSiteConfig) {
  siteConfig = {
    ...siteConfigUser,
    slugs: [],
    pages: [],
    pageToSlug: {},
  }

  siteConfig.pageMetadata = siteConfig.pageMetadata || {}

  siteConfig.fof = {
    page: siteConfig.fof?.page,
    slug: siteConfig.fof?.slug || '404',
  }

  if (siteConfig.fof.page?.length) {
    siteConfig.slugToPage[siteConfig.fof.slug] = siteConfig.fof.page
  }

  // Build helper indexes for worker and for the client (body.js)
  Object.keys(siteConfig.slugToPage).forEach((slug) => {
    const pageId = siteConfig.slugToPage[slug]

    siteConfig.slugs.push(slug)
    siteConfig.pages.push(pageId)
    siteConfig.pageToSlug[pageId] = slug
  })
}
