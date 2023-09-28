<script lang="ts" setup>
const { data, refresh } = await useFetch('/api/urls')

async function deleteKey(key: string) {
  await useFetch(`/api/urls/${key}`, { method: 'DELETE' })
  await refresh()
}

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
  <h1> Keys </h1>
  <form @submit.prevent="createKey($event)">
    <input type="text" name="key" required />
    <input type="text" name="url" required />
    <button type="submit">Add</button>
  </form>
  <ul>
    <li v-for="key in data" :key="key">
      {{ key }}
      <NuxtLink :to="`/r/${key}`" target="_blank"> Open link </NuxtLink>
      <!-- Refactor to use a button in order to have the pending state -->
      <button @click="deleteKey(key)">Delete</button>
    </li>
  </ul>
</template>
