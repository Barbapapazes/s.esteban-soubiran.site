export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const body = await readBody<{ name: string | undefined; url: string | undefined }>(event)

  if (!body.name || !body.url) {
    createError({ statusCode: 400, message: 'You must provide a name and a url' })
    return
  }

  const name = body.name
  const url = body.url

  await useStorage('db').setItem(name, url)

  setResponseStatus(event, 201)
  return { name, url }
})
