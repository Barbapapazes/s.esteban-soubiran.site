export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const name = getRouterParam(event, 'name')

  if (!name) {
    createError({ statusCode: 400, message: 'No name provided' })
    return
  }

  await useStorage('db').removeItem(name)

  return sendNoContent(event, 204)
})
