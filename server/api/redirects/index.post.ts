export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const body = await readBody<{ name: string | undefined; url: string | undefined }>(event)

  if (!body.name || !body.url)
    throw createError({ statusCode: 400, message: 'You must provide a name and a url' })

  const name = body.name
  const url = body.url

  // TODO: validate name and url

  await useDb().insert(tables.redirects).values({ name, url }).run()

  return sendNoContent(event, 201)
})
