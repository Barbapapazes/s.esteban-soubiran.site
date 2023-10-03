import { z } from 'zod'
import type { RedirectWithCountActivities } from '~/types/redirect'

export default defineEventHandler(async (event): Promise<RedirectWithCountActivities> => {
  requireBasicAuth(event)

  const { name, url } = await readValidatedBody(event, z.object({
    name: z.string().min(1),
    url: z.string().url(),
  }).parse)

  const redirect = await useDb().insert(tables.redirects).values({ name, url }).returning().get()

  setResponseStatus(event, 201)
  return {
    id: redirect.id,
    name: redirect.name,
    url: redirect.url,
    countActivities: 0,
  }
})
