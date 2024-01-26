/* eslint-disable no-undef */
export async function handleApi(url: URL, request: Request) {
  // Forward API
  const response = await fetch(url.toString(), {
    body: url.pathname.startsWith('/api/v3/getPublicPageData') ? null : request.body,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    },
    method: 'POST',
  })
  const ret = new Response(response.body as BodyInit, response)

  ret.headers.set('Access-Control-Allow-Origin', '*')

  return ret
}
