export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')

  if (!key) {
    createError({ statusCode: 400, message: 'No key provided' })
    return
  }

  const item = await useStorage<string>('db').getItem(key)

  return item
})
