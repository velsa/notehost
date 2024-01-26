export interface Env {
  slugs: KVNamespace
}

export type NoteHostSiteConfig = Omit<NoteHostSiteConfigFull, 'slugs' | 'pages' | 'pageToSlug'>

export interface NoteHostSiteConfigFull {
  // Site domain, example.com
  domain: string

  // Mapping from slug to page ID
  slugToPage: Record<string, string>
  notionSlugToPage?: NoteHostNotionSlugConfig

  // SEO metadata
  // og:site_name, article:author
  siteName: string
  // og:description, twitter:description
  siteDescription: string
  // og:image, twitter:image
  siteImage?: string

  // 404 Notion page to display to visitors, the default slug is '404'
  fof?: {
    page: string | undefined
    slug: string | undefined
  }

  subDomains?: Record<string, NoteHostSiteConfigSubDomainRedirect>

  // Google Font name, you can choose from https://fonts.google.com
  googleFont?: string

  // Custom JS to be injected in <head> and <body>
  customHeadJS?: string
  customBodyJS?: string

  // Calculated fields
  pageToSlug: Record<string, string>
  slugs: Array<string>
  pages: Array<string>
}

export interface NoteHostSiteConfigSubDomainRedirect {
  redirect: string
}

export interface NoteHostNotionSlugConfig {
  // Notion database with mapping from slug to page ID
  // Columns:
  // | ------------ | ------------- |
  // |     slug     |   page link   |
  // | ------------ | ------------- |
  //         ↑              ↑
  //       text      Link to Notion page
  //
  databaseId: string

  // TODO: sync this DB to firebase via notesync
  // and save values to slugs KV on webhook from notesync
}
