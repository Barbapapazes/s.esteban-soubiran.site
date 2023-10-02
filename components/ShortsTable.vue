<script lang="ts" setup>
interface Redirect {
  name: string
  url: string
  id: number
  countActivities: number
}

defineProps<{
  data: Redirect[]
}>()

const emit = defineEmits<{
  refresh: []
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

async function deleteItem(name: string) {
  await useFetch(`/api/redirects/${name}`, { method: 'delete' })
  emit('refresh')
}

const toast = useToast()
const createActions = function (row: Redirect) {
  const origin = window.location.origin
  const source = ref(`${origin}/r/${row.name}`)
  const { copy } = useClipboard({ source })

  return [
    [
      {
        label: 'Copy Short',
        icon: 'i-heroicons-clipboard',
        click: () => {
          copy()
          toast.add({
            id: 'copy-short',
            title: `Short '${row.name}' copied`,
            icon: 'i-heroicons-clipboard-document-check',
          })
        },
      },
      {
        label: 'Open URL',
        icon: 'i-heroicons-eye',
        to: row.url,
        target: '_blank',
      },
    ],
    [{
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => {
        deleteItem(row.name)
        toast.add({
          id: 'delete-short',
          title: `Short ${row.name} deleted`,
          icon: 'i-heroicons-trash',
        })
      },
    }],
  ]
}
</script>

<template>
  <UTable :rows="data" :columns="columns" :sort="{ column: 'name', direction: 'asc' }">
    <template #actions-data="{ row }">
      <UDropdown :items="createActions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>
