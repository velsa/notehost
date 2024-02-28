export async function handleNotionAsset(url: URL) {
  const response = await fetch(url.toString())
  const body = await response.arrayBuffer()
  const ret = new Response(body, response)

  return ret
}
