import { MetaRewriter, HeadRewriter, BodyRewriter } from './rewriters'
import { NoteHostSiteConfigFull } from './types'

export async function appendJavascript(res: Response, url: URL, config: NoteHostSiteConfigFull) {
  // eslint-disable-next-line no-undef
  return new HTMLRewriter()
    .on('title', new MetaRewriter(config, url))
    .on('meta', new MetaRewriter(config, url))
    .on('head', new HeadRewriter(config))
    .on('body', new BodyRewriter(config))
    .transform(res)
}
