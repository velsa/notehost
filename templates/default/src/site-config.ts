import { NoteHostSiteConfig, googleTag } from "notehost";
import { PAGE_SCRIPT_JS_STRING } from "./_page-script-js-string";

// Set this to your Google Tag ID from Google Analytics
const GOOGLE_TAG_ID = "";

export const SITE_CONFIG: NoteHostSiteConfig = {
  domain: "<%= domainName %>",

  // Metatags, optional
  // For main page link preview
  siteName: "<%= siteName %>",
  siteDescription: "<%= siteDescription %>",
  siteImage: "<%= siteImage %>",

  // Map slugs (short page names) to Notion page IDs
  // Empty slug is your main page
  slugToPage: {
    "": "NOTION_PAGE_ID",
    about: "NOTION_PAGE_ID",
    contact: "NOTION_PAGE_ID",
  },

  // Subdomain redirects are optional
  // But it is recommended to have one for www
  subDomains: {
    www: {
      redirect: "https://<%= domainName %>",
    },
  },

  // The 404 (not found) page is optional
  // If you don't have one, the default 404 page will be used
  // fof: {
  //   page: "NOTION_PAGE_ID",
  //   slug: "404", // default
  // },

  // Google Font name, you can choose from https://fonts.google.com
  googleFont: "Roboto",

  // Custom JS for head and body of a Notion page
  customHeadJS: googleTag(GOOGLE_TAG_ID),
  customBodyJS: PAGE_SCRIPT_JS_STRING,
};
