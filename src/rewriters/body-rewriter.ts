import { NoteHostSiteConfigFull } from '../types'
import { BODY_JS_STRING } from './_body-js-string'
/* eslint-disable class-methods-use-this */
export class BodyRewriter {
  siteConfig: NoteHostSiteConfigFull

  constructor(siteConfig: NoteHostSiteConfigFull) {
    this.siteConfig = siteConfig
  }

  element(element: Element) {
    const { domain, slugToPage, pageToSlug, slugs, pages, customBodyJS } = this.siteConfig

    element.append(
      `
      <script>
      const domain = '${domain}';
      window.CONFIG.domainBaseUrl = 'https://${domain}';
      const SLUG_TO_PAGE = ${JSON.stringify(slugToPage)};
      const PAGE_TO_SLUG = ${JSON.stringify(pageToSlug)};
      const slugs = ${JSON.stringify(slugs)};
      const pages = ${JSON.stringify(pages)};
      const notionDomain = '${this.siteConfig.notionDomain ? this.siteConfig.notionDomain : 'www.notion.so'}';
      ${BODY_JS_STRING}
      </script>
      ${customBodyJS ?? ''}
      `,
      {
        html: true,
      },
    )
  }
}
