<script lang="ts" setup>
const { data, refresh, pending } = await useFetch('/api/redirects')
</script>

<template>
  <main class="py-4 flex flex-col gap-8">
    <h1 class="text-4xl text-gray-900 dark:text-gray-50 font-bold">
      Shorts
    </h1>

    <div class="flex flex-row gap-4">
      <ShortsFormModal @refresh="refresh" />

      <UButton icon="i-heroicons-arrow-path" color="white" :loading="pending" @click="refresh">
        Refresh
      </UButton>
    </div>

    <ShortsTable v-if="data" :data="data" :loading="pending" @refresh="refresh" />
  </main>
</template>
