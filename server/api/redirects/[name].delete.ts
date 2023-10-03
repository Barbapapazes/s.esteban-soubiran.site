import { eq } from 'drizzle-orm'
import type { Redirect } from '~/types/redirect'

export default defineEventHandler(async (event): Promise<Redirect> => {
  requireBasicAuth(event)

  const name = getRouterParam(event, 'name')

  if (!name)
    throw createError({ statusCode: 400, message: 'No name provided' })

  const redirect = await useDb().delete(tables.redirects).where(eq(tables.redirects.name, name)).returning().get()

  if (!redirect)
    throw createError({ statusCode: 404, message: 'Redirect not found' })

  setResponseStatus(event, 202)
  return redirect
})
