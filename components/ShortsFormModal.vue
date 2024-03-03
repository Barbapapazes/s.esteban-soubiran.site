<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
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

const toast = useToast()
async function submit(event: FormSubmitEvent<{ name: string, url: string }>) {
  loading.value = true
  try {
    const redirect = await createRedirect(event.data)

    emit('add', redirect)

    isOpen.value = false

    state.value = {
      name: '',
      url: '',
    }
  }
  catch (error) {
    console.error(error)
    if (error instanceof Error) {
      toast.add({
        title: error.name,
        description: error.message,
        color: 'red',
      })
    }
    toast.add({
      title: 'Error',
      description: 'An error occurred while creating the redirect',
      color: 'red',
    })
  }
  finally {
    loading.value = false
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
          <UInput v-model="state.name" type="text" placeholder="Short name" icon="i-ph-text-t-duotone" />
        </UFormGroup>
        <UFormGroup label="URL" name="url" required>
          <UInput v-model="state.url" type="url" placeholder="Short URL" icon="i-ph-link-duotone" />
        </UFormGroup>
      </UForm>

      <template #footer>
        <div class="flex flex-row justify-end gap-4">
          <UButton label="Cancel" variant="outline" @click="isOpen = false" />
          <UButton type="submit" form="create" icon="i-ph-plus" :loading="loading">
            Create
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
