import { HTMLRewriter } from '@worker-tools/html-rewriter'
import { NoteHostSiteConfigFull } from '.'
import { BodyRewriter, HeadRewriter, MetaRewriter } from './rewriters'

export async function appendJavascriptPolyfill(res: Response, url: URL, config: NoteHostSiteConfigFull) {
  // eslint-disable-next-line no-undef
  return new HTMLRewriter()
    .on('title', new MetaRewriter(config, url))
    .on('meta', new MetaRewriter(config, url))
    .on('head', new HeadRewriter(config))
    .on('body', new BodyRewriter(config))
    .transform(res)
}
