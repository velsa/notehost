export const BODY_JS_STRING = `
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
localStorage.__console = true

const el = document.createElement('div')
let redirected = false

function getPage() {
  return location.pathname.slice(-32)
}

function getSlug() {
  return location.pathname.slice(1)
}

function updateSlug() {
  const slug = PAGE_TO_SLUG[getPage()]

  if (slug != null) {
    history.replaceState(history.state, '', ['/', slug].join(''))
  }
}

function enableConsoleEffectAndSetMode(mode) {
  if (__console && !__console.isEnabled) {
    __console.enable()
    window.location.reload()
  } else {
    __console?.environment?.ThemeStore?.setState({ mode })
    localStorage.setItem('newTheme', JSON.stringify({ mode }))
  }
}

function onDark() {
  el.innerHTML =
    '<div title="Change to Light Mode" style="margin-left: 14px; margin-right: 14px; min-width: 0px;"><div role="button" tabindex="0" style="user-select: none; transition: background 120ms ease-in 0s; cursor: pointer; border-radius: 44px;"><div style="display: flex; flex-shrink: 0; height: 14px; width: 26px; padding: 2px; box-sizing: content-box; border-radius: 44px; border-style: solid; border-width: 0.1em; border-color: #D4D4D4; transition: background 200ms ease 0s, box-shadow 200ms ease 0s;"><div style="width: 14px; height: 14px; border-radius: 44px; transition: transform 200ms ease-out 0s, background 200ms ease-out 0s; transform: translateX(12px) translateY(0px); content: url(&quot;https://svgshare.com/i/12Tz.svg&quot;);"></div></div></div></div>'
  document.body.classList.add('dark')
  enableConsoleEffectAndSetMode('dark')
}

function onLight() {
  el.innerHTML =
    '<div title="Change to Dark Mode" style="margin-left: 14px; margin-right: 14px; min-width: 0px;"><div role="button" tabindex="0" style="user-select: none; transition: background 120ms ease-in 0s; cursor: pointer; border-radius: 44px;"><div style="display: flex; flex-shrink: 0; height: 14px; width: 26px; padding: 2px; box-sizing: content-box; border-radius: 44px; border-style: solid; border-width: 0.1em; border-color: #6D6C68; transition: background 200ms ease 0s, box-shadow 200ms ease 0s;"><div style="width: 14px; height: 14px; border-radius: 44px; transition: transform 200ms ease-out 0s, background 200ms ease-out 0s; transform: translateX(0px) translateY(0px); content: url(&quot;https://svgshare.com/i/12VG.svg&quot;);"></div></div></div></div>'
  document.body.classList.remove('dark')
  enableConsoleEffectAndSetMode('light')
}

function toggle() {
  if (document.body.classList.contains('dark')) {
    onLight()
  } else {
    onDark()
  }
}

function addDarkModeButton(device) {
  const nav =
    device === 'web'
      ? document.querySelector('.notion-topbar').firstChild
      : document.querySelector('.notion-topbar-mobile')

  el.className = 'toggle-mode'
  el.addEventListener('click', toggle)

  const timeout = device === 'web' ? 0 : 500

  setTimeout(() => {
    nav.appendChild(el)
  }, timeout)

  // get the current theme and add the toggle to represent that theme
  const currentTheme = JSON.parse(localStorage.getItem('newTheme'))?.mode

  if (currentTheme) {
    if (currentTheme === 'dark') {
      onDark()
    } else {
      onLight()
    }
  } else {
    // enable smart dark mode based on user-preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      onDark()
    } else {
      onLight()
    }
  }

  // try to detect if user-preference change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    toggle()
  })
}

const observer = new MutationObserver(() => {
  if (redirected) return

  const nav = document.querySelector('.notion-topbar')
  const mobileNav = document.querySelector('.notion-topbar-mobile')

  if ((nav && nav.firstChild && nav.firstChild.firstChild) || (mobileNav && mobileNav.firstChild)) {
    // console.log('redirected', getSlug())
    updateSlug()
    redirected = true

    addDarkModeButton(nav ? 'web' : 'mobile')

    const { onpopstate } = window

    window.onpopstate = function () {
      // console.log('onpopstate');
      if (slugs.includes(getSlug())) {
        const page = SLUG_TO_PAGE[getSlug()]

        if (page) {
          // console.log('slug:', getSlug())
          // console.log('redirecting to:', page)
          history.replaceState(history.state, 'bypass', ['/', page].join(''))
        }
      }

      onpopstate.apply(this, [].slice.call(arguments))
      updateSlug()
    }
  }
})

observer.observe(document.querySelector('#notion-app'), {
  childList: true,
  subtree: true,
})

const { replaceState, back, forward } = window.history

window.history.back = function () {
  back.apply(window.history, arguments)
}

window.history.forward = function () {
  forward.apply(window.history, arguments)
}

window.history.replaceState = function () {
  if (arguments[1] === 'bypass') {
    return
  }

  const slug = getSlug()
  const isKnownSlug = slugs.includes(slug)

  console.log('replaceState:', { slug, isKnownSlug, arguments })

  // console.log('replaceState arguments:', arguments)
  // console.log('replaceState state:', state)

  if (arguments[2] === '/login') {
    const page = SLUG_TO_PAGE[slug]

    if (page) {
      // console.log('slug:', slug)
      // console.log('redirecting to:', page)
      arguments[2] = ['/', page].join('')
      replaceState.apply(window.history, arguments)
      window.location.reload()

      return
    }
  } else {
    if (isKnownSlug && arguments[2] !== ['/', slug].join('')) {
      return
    }
  }

  replaceState.apply(window.history, arguments)
}

const { pushState } = window.history

window.history.pushState = function () {
  const dest = new URL(location.protocol + location.host + arguments[2])
  const id = dest.pathname.slice(-32)

  // console.log('pushState state:', state)
  // console.log('pushState id:', id)
  if (pages.includes(id)) {
    arguments[2] = ['/', PAGE_TO_SLUG[id]].join('')
  }

  return pushState.apply(window.history, arguments)
}

const { open } = window.XMLHttpRequest.prototype

window.XMLHttpRequest.prototype.open = function () {
  arguments[1] = arguments[1].replace(domain, notionDomain)

  if (arguments[1].indexOf('msgstore.' + notionDomain) > -1) {
    return
  }

  // console.log('XMLHttpRequest.open arguments:', arguments)
  open.apply(this, [].slice.call(arguments))
}
`
