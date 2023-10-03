import type { Redirect } from '~/types/redirect'
import type { Toast } from '~/types/toast'

export async function createRedirect(redirect: Pick<Redirect, 'name' | 'url'>, toast: Toast): Promise<Ref<Redirect | null>> {
  const { data, error } = await useFetch('/api/redirects', { method: 'POST', body: redirect })

  if (error.value) {
    createToast({
      type: 'error',
      title: 'Error creating short',
      description: error.value.message,
    }, toast)

    return ref(null)
  }

  createToast({
    type: 'ok',
    title: `Short ${redirect.name} created`,
  }, toast)

  return data
}

export async function deleteRedirect(name: string, toast: Toast): Promise<Ref<Redirect | null>> {
  const { data, error } = await useFetch(`/api/redirects/${name}`, { method: 'DELETE' })

  if (error.value) {
    createToast({
      type: 'error',
      title: `Error deleting short '${name}'`,
      description: error.value.message,
    }, toast)

    return ref(null)
  }

  createToast({
    type: 'ok',
    title: `Short '${name}' deleted`,
  }, toast)

  return data
}
