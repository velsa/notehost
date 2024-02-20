import { input } from '@inquirer/prompts'
import { validDomainName } from './validators'

export interface SiteConfig {
  domainName: string
  mainPageId: string
  siteName: string
  siteDescription: string
  siteImage: string
}

export async function getSiteConfigFromUser(domain: string): Promise<SiteConfig> {
  const siteConfig = { domainName: domain } as SiteConfig

  do {
    siteConfig.domainName = await input({
      message: 'Please confirm the domain name:',
      default: siteConfig.domainName,
    })

    if (!validDomainName(siteConfig.domainName)) {
      console.error('Invalid domain name:', siteConfig.domainName)
    }
  } while (!validDomainName(siteConfig.domainName))

  console.log(
    '\n🏷️  Metadata details.' +
      '\nYou can skip those fields now (press Enter) and fill them later via the config file.\n',
  )

  siteConfig.mainPageId = await input({
    message: 'ID of your Notion Page:',
  })
  siteConfig.siteName = await input({ message: 'Your site name:' })
  siteConfig.siteDescription = await input({
    message: 'Your site description:',
  })
  siteConfig.siteImage = await input({
    message: 'Link preview image URL:',
  })

  return siteConfig
}
