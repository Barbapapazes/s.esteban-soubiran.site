export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const name = getRouterParam(event, 'name')

  if (!name) {
    createError({ statusCode: 400, message: 'No name provided' })
    return
  }

  const item = await useStorage<string>('db').getItem(name)

  return item
})
