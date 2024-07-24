/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLRewriter } from 'htmlrewriter'
import { NoteHostSiteConfigFull } from '.'
import { BodyRewriter, HeadRewriter, MetaRewriter } from './rewriters'

export async function appendJavascriptPolyfill(res: Response, url: URL, config: NoteHostSiteConfigFull) {
  // eslint-disable-next-line no-undef
  return new HTMLRewriter()
    .on('title', new MetaRewriter(config, url) as any)
    .on('meta', new MetaRewriter(config, url) as any)
    .on('head', new HeadRewriter(config) as any)
    .on('body', new BodyRewriter(config) as any)
    .transform(res)
}
