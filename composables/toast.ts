import type { Toast } from '~/types/toast'

export function createToast(data: { title: string; type: 'ok' | 'error'; description?: string }, toast: Toast): void {
  if (data.type === 'ok')
    createOkToast(data, toast)
  else if (data.type === 'error')
    createErrorToast(data, toast)
  else throw new Error('Invalid toast type')
}

export function createErrorToast(data: { title: string; description?: string }, toast: Toast): void {
  toast.add({
    id: `create-short-error-${data.title}`,
    title: data.title,
    description: data.description,
    icon: 'i-heroicons-x-circle',
    color: 'red',
  })
}

export function createOkToast(data: { title: string; description?: string }, toast: Toast): void {
  toast.add({
    id: `create-short-ok-${data.title}`,
    title: data.title,
    description: data.description,
    icon: 'i-heroicons-check-circle',
    color: 'green',
  })
}
