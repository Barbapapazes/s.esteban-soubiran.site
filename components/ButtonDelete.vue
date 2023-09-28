<script lang="ts" setup>
const props = defineProps<{
  item: string
}>()

const emit = defineEmits<{
  delete: []
}>()

const loading = ref(false)

async function deleteItem() {
  loading.value = true
  await useFetch(`/api/urls/${props.item}`, { method: 'delete' })
  // Do not reset loading state since the item will be removed from the list
  emit('delete')
}
</script>

<template>
  <UButton type="button" color="red" icon="i-heroicons-trash" :loading="loading" @click="deleteItem()">
    Delete
  </UButton>
</template>
