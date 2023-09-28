export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const keys = await useStorage<string>('db').getKeys()

  return keys
})
