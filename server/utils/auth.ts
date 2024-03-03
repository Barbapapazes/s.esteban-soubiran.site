import { Buffer } from 'node:buffer'
import type { H3Event } from 'h3'

export function requireBasicAuth(event: H3Event) {
  const authentication = getRequestHeader(event, 'Authorization')

  if (!authentication)
    return askForBasicAuth(event)

  // Decode base64 encoded string
  const [username, password] = Buffer.from(authentication.split(' ')[1], 'base64').toString().split(':')

  const basicAuthConfig = useRuntimeConfig(event).basicAuth
  if (username === basicAuthConfig.username && password === basicAuthConfig.password)
    return

  return askForBasicAuth(event)
}

function askForBasicAuth(event: H3Event) {
  setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area", charset="UTF-8"')
  throw createError({ statusCode: 401, message: 'Unauthorized' })
}
