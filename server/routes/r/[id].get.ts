import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'id')

  if (!name)
    throw createError({ statusCode: 400, message: 'No name provided' })

  const [redirect, ..._] = await useDrizzle().select({ url: tables.redirects.url, id: tables.redirects.id }).from(tables.redirects).where(eq(tables.redirects.name, name)).limit(1).all()

  if (!redirect)
    throw createError({ statusCode: 404, message: 'Not Found' })

  await useDrizzle().insert(tables.activities).values({ redirectId: redirect.id, usedAt: new Date() }).run()

  return sendRedirect(event, redirect.url, 302)
})
