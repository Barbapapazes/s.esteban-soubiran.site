import type { Redirect } from '~/types/redirect'

export async function createRedirect(redirect: Pick<Redirect, 'name' | 'url'>) {
  return $fetch('/api/redirects', {
    method: 'POST',
    body: redirect,
  })
}

export async function deleteRedirect(name: string) {
  return $fetch(`/api/redirects/${name}`, {
    method: 'DELETE',
  })
}
