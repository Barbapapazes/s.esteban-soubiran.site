export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const body = await readBody(event)

  const key = body.key
  const url = body.url

  await useStorage('db').setItem(key, url)

  setResponseStatus(event, 201)
  return { key, url }
})
