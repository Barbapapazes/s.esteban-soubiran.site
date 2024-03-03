<script lang="ts" setup>
import type { Redirect } from '~/types/redirect'

defineProps<{
  data: Redirect[]
}>()

const emit = defineEmits<{
  delete: [redirect: Redirect | null]
}>()

const columns = ref([
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'url',
    label: 'URL',
    sortable: true,
  },
  {
    key: 'countActivities',
    label: 'Activities',
    sortable: true,
  },
  {
    key: 'actions',
    label: 'Actions',
  },
])

const toast = useToast()

function copyToClipboard(name: string) {
  const origin = window.location.origin
  const source = ref(`${origin}/r/${name}`)
  const { copy } = useClipboard({ source })

  copy()
  toast.add({
    id: 'copy-short',
    title: `Short '${name}' copied`,
    icon: 'i-ph-check-circle-duotone',
  })
}

const createActions = function (row: Redirect) {
  return [
    [
      {
        label: 'Copy Short',
        icon: 'i-ph-clipboard-duotone',
        click: () => copyToClipboard(row.name),
      },
      {
        label: 'Open URL',
        icon: 'i-ph-eye-duotone',
        to: row.url,
        target: '_blank',
      },
    ],
    [{
      label: 'Delete',
      icon: 'i-ph-trash-duotone',
      click: async () => {
        try {
          const redirect = await deleteRedirect(row.name)
          emit('delete', redirect)
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
            description: 'An error occurred while deleting the redirect',
            color: 'red',
          })
        }
      },
    }],
  ]
}
</script>

<template>
  <UTable :rows="data" :columns="columns" :sort="{ column: 'name', direction: 'asc' }">
    <template #name-data="{ row }">
      <button class="hover:text-primary font-medium" @click="copyToClipboard(row.name)">
        {{ row.name }}
      </button>
    </template>
    <template #url-data="{ row }">
      <UButton color="primary" variant="link" :to="row.url">
        {{ row.url }}
      </UButton>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="createActions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>
