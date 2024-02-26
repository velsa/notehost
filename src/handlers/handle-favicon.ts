export async function handleFavicon(url: URL, siteIcon: string) {
  const response = await fetch(siteIcon)
  const body = await response.arrayBuffer()
  const ret = new Response(body, response)

  return ret
}
