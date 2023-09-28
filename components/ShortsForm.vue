<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'

const emit = defineEmits<
{
  refresh: []
}>()

const loading = ref(false)

const state = ref({
  name: '',
  url: '',
})

function validate(state: {
  name: string | undefined
  url: string | undefined
}): FormError[] {
  const errors: FormError[] = []

  if (!state.name)
    errors.push({ path: 'name', message: 'Name is required' })
  if (!state.url)
    errors.push({ path: 'url', message: 'URL is required' })

  return errors
}

async function createShort(event: FormSubmitEvent<{ name: string; url: string }>) {
  loading.value = true

  await useFetch('/api/urls', { method: 'POST', body: event.data })

  setTimeout(() => {
    // Used since Cloudflare is not yet updated
    emit('refresh')
  }, 100)

  loading.value = false

  state.value = {
    name: '',
    url: '',
  }
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="flex flex-col items-start gap-4" @submit="createShort">
    <div class="grid grid-cols-2 gap-4">
      <UFormGroup label="Name" name="name" required>
        <UInput v-model="state.name" type="text" placeholder="Short name" icon="i-heroicons-finger-print" />
      </UFormGroup>
      <UFormGroup label="URL" name="url" required>
        <UInput v-model="state.url" type="url" placeholder="Short URL" icon="i-heroicons-link" />
      </UFormGroup>
    </div>
    <UButton type="submit" icon="i-heroicons-plus" :loading="loading">
      Create
    </UButton>
  </UForm>
</template>
