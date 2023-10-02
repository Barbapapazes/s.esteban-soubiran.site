import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const redirects = await useDb().select().from(tables.redirects).leftJoin(tables.activities, eq(tables.activities.redirectId, tables.redirects.id)).all()

  const data = redirects.reduce((acc, { redirects, activities }) => {
    const index = acc.findIndex(({ id }) => id === redirects.id)
    const isNewItem = index === -1

    const { id, name, url } = redirects

    if (isNewItem)
      acc.push({ id, name, url, countActivities: activities ? 1 : 0 })
    else if (activities && !isNewItem)
      acc[index].countActivities++

    return acc
  }, [] as { id: number; name: string; url: string; countActivities: number }[])

  return data
})
