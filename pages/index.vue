<script lang="ts" setup>
const { data, refresh } = await useFetch('/api/urls')

async function createKey(event: Event) {
  const form = new FormData(event.target as HTMLFormElement)
  const key = form.get('key') as string
  const url = form.get('url') as string
  await useFetch(`/api/urls`, { method: 'POST', body: { key, url } })
  await refresh()
  event.target.reset()
}
</script>

<template>
  <UContainer>
  <h1 class="text-4xl text-gray-900 dark="text-gray-50"> Keys </h1>
  <form @submit.prevent="createKey($event)">
    <input type="text" name="key" required />
    <input type="text" name="url" required />
    <button type="submit">Add</button>
  </form>
    <ShortsTable :data="data" @refresh="refresh" />
  </UContainer>
</template>
