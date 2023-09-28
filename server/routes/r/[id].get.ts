export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    createError({ statusCode: 400, message: 'No ID provided' })
    return
  }

  const url = await useStorage<string>('db').getItem(id)

  if (!url) {
    createError({ statusCode: 404, message: 'Not Found' })
    return
  }

  return sendRedirect(event, url, 302)
})
