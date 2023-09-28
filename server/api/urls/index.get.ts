export default defineEventHandler(async (event) => {
  requireBasicAuth(event)

  const names = await useStorage<string>('db').getKeys()

  return names
})
