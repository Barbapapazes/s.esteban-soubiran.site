<script lang="ts" setup>
const props = defineProps<{
  data: string[]
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
    key: 'actions',
    label: 'Actions',
  },
])

const rows = computed(() => {
  return props.data.map((item) => {
    return {
      name: item,
    }
  })
})

async function deleteItem(name: string) {
  await useFetch(`/api/urls/${name}`, { method: 'delete' })
  setInterval(() => {
    emit('refresh') // Used since Cloudflare is not yet updated
  }, 100)
}

const createActions = function (row: { name: string }) {
  return [
    [{
      label: 'Open',
      icon: 'i-heroicons-eye',
      to: `/r/${row.name}`,
      target: '_blank',
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => deleteItem(row.name),
    }],
  ]
}
</script>

<template>
  <UTable :rows="rows" :columns="columns" :sort="{ column: 'name', direction: 'asc' }">
    <template #actions-data="{ row }">
      <UDropdown :items="createActions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>
