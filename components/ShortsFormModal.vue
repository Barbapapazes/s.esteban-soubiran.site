<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import type { Redirect } from '~/types/redirect'

const emit = defineEmits<{
  add: [redirect: Redirect | null]
}>()

const isOpen = ref(false)

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

async function submit(event: FormSubmitEvent<{ name: string; url: string }>) {
  loading.value = true

  const redirect = await createRedirect(event.data, useToast())

  loading.value = false

  if (redirect.value) {
    emit('add', redirect.value)

    isOpen.value = false

    state.value = {
      name: '',
      url: '',
    }
  }
}
</script>

<template>
  <UButton label="Create" icon="i-heroicons-plus" @click="isOpen = true" />

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">
          Create a new short
        </h2>
      </template>

      <UForm id="create" :validate="validate" :state="state" class="flex flex-col gap-4" @submit="submit">
        <UFormGroup label="Name" name="name" required>
          <UInput v-model="state.name" type="text" placeholder="Short name" icon="i-heroicons-finger-print" />
        </UFormGroup>
        <UFormGroup label="URL" name="url" required>
          <UInput v-model="state.url" type="url" placeholder="Short URL" icon="i-heroicons-link" />
        </UFormGroup>
      </UForm>

      <template #footer>
        <div class="flex flex-row justify-end gap-4">
          <UButton label="Cancel" variant="outline" @click="isOpen = false" />
          <UButton type="submit" form="create" icon="i-heroicons-plus" :loading="loading">
            Create
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
