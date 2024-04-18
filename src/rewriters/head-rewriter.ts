import { NoteHostSiteConfigFull } from '../types'

/* eslint-disable class-methods-use-this */
export class HeadRewriter {
  siteConfig: NoteHostSiteConfigFull

  constructor(siteConfig: NoteHostSiteConfigFull) {
    this.siteConfig = siteConfig
  }

  element(element: Element) {
    const { googleFont, customHeadJS, customHeadCSS } = this.siteConfig

    if (googleFont) {
      element.append(
        `<link href='https://fonts.googleapis.com/css?family=${googleFont.replace(
          ' ',
          '+',
        )}:Regular,Bold,Italic&display=swap' rel='stylesheet'>
          <style>* { font-family: "${googleFont}" !important; }</style>`,
        {
          html: true,
        },
      )
    }

    element.append(
      `<style>
        div.notion-topbar > div > div:nth-child(3) { display: none !important; }
        div.notion-topbar > div > div:nth-child(4) { display: none !important; }
        div.notion-topbar > div > div:nth-child(5) { display: none !important; }
        div.notion-topbar > div > div:nth-child(6) { display: none !important; }
        div.notion-topbar > div > div:nth-child(7) { display: none !important; }
        div.notion-topbar > div > div:nth-child(1n).toggle-mode { display: block !important; }
        
        div.notion-topbar-mobile > div:nth-child(3) { display: none !important; }
        div.notion-topbar-mobile > div:nth-child(4) { display: none !important; }
        div.notion-topbar-mobile > div:nth-child(7) { display: none !important; }
        div.notion-topbar-mobile > div:nth-child(1n).toggle-mode { display: block !important; }
        ${customHeadCSS ?? ''}
        </style>
        ${customHeadJS ?? ''}`,
      {
        html: true,
      },
    )
  }
}
