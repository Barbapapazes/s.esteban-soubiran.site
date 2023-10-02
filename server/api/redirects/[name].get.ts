import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const name = getRouterParam(event, 'name')

  if (!name)
    throw createError({ statusCode: 400, message: 'No name provided' })

  const [redirect, ..._] = await useDb().select({ id: tables.redirects.id, name: tables.redirects.name, url: tables.redirects.url }).from(tables.redirects).where(eq(tables.redirects.name, name)).limit(1).all()

  const activities = await useDb().select({ id: tables.activities.id, usedAt: tables.activities.usedAt }).from(tables.activities).where(eq(tables.activities.redirectId, redirect.id)).all()

  return {
    ...redirect,
    activities,
  }
})
