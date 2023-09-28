export default defineEventHandler(async (event) => {
  // Secure this using http authentication
  const body = await readBody(event)

  const key = body.key
  const url = body.url

  console.log(key, url)

  await useStorage('db').setItem(key, url)

  setResponseStatus(event, 201)
  return { key, url }
})
