import type { H3Event } from 'h3';

export function requireBasicAuth(event: H3Event) {
  const authentication = getRequestHeader(event, 'Authorization')

  if (!authentication) {
    return askForBasicAuth(event)
  }

  // Decode base64 encoded string
  const [username, password] = Buffer.from(authentication.split(' ')[1], 'base64').toString().split(':')

  const basicAuthConfig = useRuntimeConfig().basicAuth
  if (username === basicAuthConfig.username && password === basicAuthConfig.password) {
    return
  }

  askForBasicAuth(event)
}

function askForBasicAuth(event: H3Event) {
  setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area", charset="UTF-8"')
  setResponseStatus(event, 401)
  return 'Unauthorized'
}
