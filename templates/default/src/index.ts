import { initializeReverseProxy, reverseProxy } from 'notehost'
import { SITE_CONFIG } from './site-config'

initializeReverseProxy(SITE_CONFIG)

export default {
  async fetch(request: Request): Promise<Response> {
    return await reverseProxy(request)
  },
}
