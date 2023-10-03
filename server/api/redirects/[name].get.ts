import { eq } from 'drizzle-orm'
import type { RedirectWithActivities } from '~/types/redirect'

export default defineEventHandler(async (event): Promise<RedirectWithActivities> => {
  requireBasicAuth(event)

  const name = getRouterParam(event, 'name')

  if (!name)
    throw createError({ statusCode: 400, message: 'No name provided' })

  const [redirect, ..._] = await useDb().select().from(tables.redirects).where(eq(tables.redirects.name, name)).limit(1).all()

  const activities = await useDb().select().from(tables.activities).where(eq(tables.activities.redirectId, redirect.id)).all()

  return {
    ...redirect,
    activities,
  }
})
