export default defineEventHandler(async (event) => {
  // Secure this using http authentication
  const keys = await useStorage<string>('db').getKeys()

  return keys
})
