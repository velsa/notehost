import { input } from "@inquirer/prompts";
import { validDomainName } from "./validators";

export interface SiteConfig {
  domainName: string;

  siteName: string;
  siteDescription: string;
  siteImage: string;
}

export async function getSiteConfigFromUser(
  domain: string
): Promise<SiteConfig> {
  const siteConfig = { domainName: domain } as SiteConfig;

  do {
    siteConfig.domainName = await input({
      message: "Please confirm the domain name:",
      default: siteConfig.domainName,
    });

    if (!validDomainName(siteConfig.domainName)) {
      console.error("Invalid domain name:", siteConfig.domainName);
    }
  } while (!validDomainName(siteConfig.domainName));

  console.log(
    "\n🏷️  Metadata details." +
      "\nYou can skip those fields now (press Enter) and fill them later via the config file.\n"
  );

  siteConfig.siteName = await input({ message: "Enter your site name:" });
  siteConfig.siteDescription = await input({
    message: "Enter your site description:",
  });
  siteConfig.siteImage = await input({
    message: "Enter link preview image URL:",
  });

  return siteConfig;
}
