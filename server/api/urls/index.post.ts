export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const body = await readBody<{ key: string | undefined, url: string | undefined }>(event)

  if (!body.key || !body.url) {
    createError({ statusCode: 400, message: 'You must provide a key and a url' })
    return
  }

  const key = body.key
  const url = body.url

  await useStorage('db').setItem(key, url)

  setResponseStatus(event, 201)
  return { key, url }
})
