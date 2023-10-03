<script lang="ts" setup>
import type { Redirect } from '~/types/redirect'

const { data, refresh, pending } = await useFetch('/api/redirects')

function addRedirect(redirect: Redirect | null) {
  if (!data.value || !redirect)
    return

  data.value.push(redirect)
}

function deleteRedirect(redirect: Redirect | null) {
  if (!data.value || !redirect)
    return

  data.value = data.value.filter(r => r.id !== redirect.id)
}
</script>

<template>
  <main class="py-4 flex flex-col gap-8">
    <h1 class="text-4xl text-gray-900 dark:text-gray-50 font-bold">
      Shorts
    </h1>

    <div class="flex flex-row gap-4">
      <ShortsFormModal @add="addRedirect($event)" />

      <UButton icon="i-heroicons-arrow-path" color="white" :loading="pending" @click="refresh">
        Refresh
      </UButton>
    </div>

    <ShortsTable v-if="data" :data="data" :loading="pending" @delete="deleteRedirect($event)" />
  </main>
</template>
