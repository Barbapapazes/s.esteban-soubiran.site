export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const key = getRouterParam(event, 'key')

  if (!key) {
    createError({ statusCode: 400, message: 'No key provided'})
    return
  }

  await useStorage('db').removeItem(key)

  return sendNoContent(event, 204)
})
