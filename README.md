# NoteHost: Free Hosting for Notion Sites!

## Using:

- Cloudflare DNS
- Cloudflare workers
- Reverse proxy implementation
- TypeScript

## Supports:

- Custom meta tags
- Page slugs
- Dark mode toggle
- Custom JS for head and body
- Custom fonts (using [Google Fonts](https://fonts.google.com/))
- Subdomain redirect (e.g. www)

# How to Use

These steps are also posted in greater detail at this Notion site: [https://dudethatserin.notion.site/NoteHost-982d31fcc8dd4799a18efcb074b0e63c](https://dudethatserin.notion.site/NoteHost-982d31fcc8dd4799a18efcb074b0e63c)

> [!TIP]
> If you would like images to go with this process, I recommend visiting the link above, this link include a [Showcase](https://dudethatserin.notion.site/46f6535c6e7444aa87bc8ad22bd86b80?v=333a560239d948d5b1290b858a8183dd) where you can see all of the sites created with NoteHost as well as a similar tutorial as below but with screenshots.

> [!NOTE]
> If you would like to purchase a domain for this project and set up NoteHost for it, feel free!

## Setup your Cloudflare Account

---

## Prerequisites

1. Enable **Public Access** on your desired pages through Notion's Share menu, and **Allow Search Engines** (optional).
2. Purchase your desired domain with a registrar like [NameCheap](https://namecheap.com), [Ionos](https://ionos.com), [GoDaddy](https://godaddy.com), or [Hostinger](https://hostinger.com).

## Step 1: Set up your CloudFlare account (5 minutes)

1. Sign up for an account if you don't already have one at the following link: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Enter your custom domain name. If you would like to use a subdomain, you should still enter your root domain name here. For example: `vesla.net` or `subdomain.velsa.net`
3. Select the Free plan.
4. Delete any `A` records for `domain.com` or `www` as well as any `CNAME` records for `domain.com` or `www`
5. Copy the 2 nameservers provided, which end with `.ns.cloudflare.com`
6. Paste the nameservers in the domain setting page at your registrar. If you aren't sure where to go, here are a few links to popular registrars: [NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/), [GoDaddy](https://www.godaddy.com/help/edit-my-domain-nameservers-664), [Ionos (Previously 1&1)](https://www.ionos.com/help/domains/using-your-own-name-servers/using-your-own-name-servers-for-a-domain/), [Hostinger](https://support.hostinger.com/en/articles/1696789-how-to-change-nameservers-at-hostinger), [Squarespace (Previously Google Domains)](https://support.squarespace.com/hc/en-us/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains) I found these by simply typing in `change nameservers XXX` where `XXX` is the domain registrar. If you use a different one, just use that instead of the `XXX` to find a link to how to do it for your registrar.
7. Wait for 5 minutes, then click `Continue`.
8. Click `Get Started` when you get to the Quick Start Guide.
9. Keep `Automatic HTTPS Rewrites` enabled.
10. Enable `Always use HTTPS` and click Save.
11. Keep `Brotli` enabled and click Save.
12. Click `Finish`
13. You should be taken to a page that shows `Overview domain.com` where `domain.com` is your domain or subdomain. It should alsos tate that your domain has been successfully set up.
    - If it states that your domain is `not active on Cloudflare yet` you need to click "check nameservers now" at the bottom of the page and give it a few hours to update. It will update but could take up to 24 hours. Generally, it is faster but it could take longer. You can keep refreshing the page to check the status.
14. Select the `Workers Routes` page in the left sidebar and click `Manage Workers`.
15. (optional) Click `Create application` (if you see this option)
16. Click `Create Worker`
17. Give it a memorable name like `domain-com-notion-proxy` where `domain-com` is your domain or subdomain name. Then click `Deploy`.

## Step 2: Configure Wrangler and NoteHost on your System (5 minutes)

This will work regardless of whether you are on Windows or Mac or Linux. These steps will be written for an absolute beginner, if you are more advanced you can skip to step **6** and that is where the more "advanced" steps are though they aren't too terribly advanced.

1. Create a folder on your system for your domain. My domain is `dudethatserin.com` in this example so my folder is going to be `dte`.
2. Open Powershell on Windows or Terminal on Mac or Linux.
3. Navigate to this folder. The way you find out where you are on your computer is by typing `ls`. This lists out the folders (called directories when viewing them this way) and files on your computer at your current location. To navigate to the root of your computer (where *all* of your files are stored) you will want to type `cd`. `cd` is used to navigate between directories and when you type it without a directory name or path it takes you back to the very beginning.
    - Navigate to the folder by typing
    ```
    cd dte
    ```
4. Once you are there, see if you have `npm` installed by typing `npm -v`. If red text comes up, that indicates that `npm` is not installed. `npm` is what is used to install and run NoteHost. So, follow the steps outlined on `npm`'s website to install it: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). I recommend using `nvm` to manage the versions of npm and node.js on your computer. You can follow [this tutorial](https://github.com/creationix/nvm) for Mac & Linux and [this tutorial](https://github.com/coreybutler/nvm-windows) for Windows. The first link on `npm`'s website includes an installer which you can also use if you choose to.
   - Make sure you follow **all** of the steps listed in powershell/terminal. The last step is super important and makes sure npm/node will work on your system.
5. To verify npm works, close powershell/terminal and reopen it (or open a new tab in the same folder) and run:
   ```
   npm -v
   ```
    That should give you the version number of npm that is running.
6. In the folder you created in step 1, you will need to install NoteHost. To do that you will want to run:
```
npm i notehost@latest
```
7. Run the following code where `<domain>` is your domain or subdomain, it will initialize NoteHost:
```
npx notehost init <domain>
```
8. Once NoteHost is installed and initialized, you will see the following files and folders inside the folder you created with `.` being the domain you provided while installing notehost.
```
.
├── build-page-script-js-string.sh    helper script, details below
├── package.json                      test & deploy your website, see realtime logs
├── tsconfig.json                     types config
├── wrangler.toml                     your Cloudflare worker config
└── src
    ├── _page-script-js-string.ts     generated by helper script
    ├── index.ts                      runs reverse proxy
    ├── page-script.js                your custom JS page script
    └── site-config.ts                your domain and website config
```
9. Go inside the `.` directory and run:
```
npm i
```
That will make sure to install everything you need for your website.
10. Once you do that, open File Explorer on Windows or Finder on Mac (not sure what it is called on Linux) and navigate to this `.` folder. Inside there open the `src` folder and open `site-config.ts` inside an editor like NotePad, Sublime, Visual Studio Code, or similar. It will look like the following. Just update anything that references your website and then save and close it.
```
import { NoteHostSiteConfig, googleTag } from 'notehost'
import { PAGE_SCRIPT_JS_STRING } from './_page-script-js-string'

// Set this to your Google Tag ID from Google Analytics
const GOOGLE_TAG_ID = ''

export const SITE_CONFIG: NoteHostSiteConfig = {
  domain: 'yourdomain.com',

  // Metatags, optional
  // For main page link preview
  siteName: 'My Notion Website',
  siteDescription: 'Build your own website with Notion. This is a demo site.',
  siteImage: 'https://imagehosting.com/images/preview.jpg',

  // URL to custom favicon.ico
  siteIcon: 'https://imagehosting.com/images/favicon.ico',

  // Additional safety: avoid serving extraneous Notion content from your website
  // Use the value from your Notion settings => Workspace => Settings => Domain
  notionDomain: 'mydomain',

  // Map slugs (short page names) to Notion page IDs
  // Empty slug is your main page
  slugToPage: {
    '': 'NOTION_PAGE_ID',
    about: 'NOTION_PAGE_ID',
    contact: 'NOTION_PAGE_ID',
    // Hint: you can use '/' in slug name to create subpages
    'about/people': 'NOTION_PAGE_ID',
  },

  // Subdomain redirects are optional
  // But it is recommended to have one for www
  subDomains: {
    www: {
      redirect: 'https://yourdomain.com',
    },
  },

  // The 404 (not found) page is optional
  // If you don't have one, the default 404 page will be used
  fof: {
    page: 'NOTION_PAGE_ID',
    slug: '404', // default
  },

  // Google Font name, you can choose from https://fonts.google.com
  googleFont: 'Roboto',

  // Custom JS for head and body of a Notion page
  customHeadJS: googleTag(GOOGLE_TAG_ID),
  customBodyJS: PAGE_SCRIPT_JS_STRING,
}
```
The `NOTION_PAGE_ID` comes from the URL you get from the Share Menu inside of Notion. Paste that URL into your browser and it is the long set of numbers and letters at the end of your domain.

11. Now you will want to open the `wrangler.toml` file (inside the `.` folder) and make sure the `name` field matches the CloudFlare worker you created previously matches. If it doesn't, update it inside this file to match. Then save and close the file.
12. Run the following code in Powershell on Windows or Terminal on Mac or Linux to install wrangler, which is used to publish changes to your CloudFlare worker:
```
npm i wrangler@latest
```
13. Once you do that, run:
```
npx wrangler login
```
This will open a window in your default browser asking you to authenticate CloudFlare and allow Wrangler to write to your worker (to publish changes). You will want to confirm this.
14. Run the following code to push these changes (in the `site-config.ts` and `wrangler.toml` files) to CloudFlare.
```
npm run deploy
```
15. DONE! Now you will want to visit your site online to make sure the changes work.

> [!IMPORTANT]
> You need to run deploy every time you update `page-script.js` or `site-config.ts`

If you have any issues with this process, please open an issue with screenshots so that someone can help you resolve the issue(s).

# Acknowledgments

Based on [Fruition](https://stephenou.notion.site/Fruition-Free-Open-Source-Toolkit-for-Building-Websites-with-Notion-771ef38657244c27b9389734a9cbff44), which is no longer maintained 😕

Lots of thanks to [@DudeThatsErin](https://github.com/DudeThatsErin) and her [code snippet](https://github.com/stephenou/fruitionsite/issues/258#issue-1929516345) as well as writing up this quick start guide on this readme as well as on our Notion site: [https://dudethatserin.notion.site/NoteHost-982d31fcc8dd4799a18efcb074b0e63c](https://dudethatserin.notion.site/NoteHost-982d31fcc8dd4799a18efcb074b0e63c).
