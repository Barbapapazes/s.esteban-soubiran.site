import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const name = getRouterParam(event, 'name')

  if (!name)
    throw createError({ statusCode: 400, message: 'No name provided' })

  await useDb().delete(tables.redirects).where(eq(tables.redirects.name, name)).run()

  return sendNoContent(event, 204)
})
