export async function handleJs(url: URL) {
  const response = await fetch(url.toString())
  const body = await response.text()
  const ret = new Response(body, response)

  ret.headers.set('Content-Type', 'application/x-javascript')

  return ret
}
