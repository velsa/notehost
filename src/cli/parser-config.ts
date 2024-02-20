import * as changeCase from 'change-case-all'
import { version } from '../../package.json'
import { SiteConfig, getSiteConfigFromUser } from './site-config'

export interface ParserConfig extends SiteConfig {
  packageJsonName: string
  wranglerWorkerName: string

  notehostVersion: string
}

export async function getParserConfig(domainName: string | undefined): Promise<ParserConfig> {
  const { mainPageId, siteName, siteDescription, siteImage } = await getSiteConfigFromUser(domainName)
  const kebabDomain = changeCase.kebabCase(domainName)

  return {
    domainName,
    mainPageId,
    siteName,
    siteDescription,
    siteImage,
    packageJsonName: kebabDomain,
    wranglerWorkerName: `${kebabDomain}-notion-proxy`,
    notehostVersion: version,
  }
}
