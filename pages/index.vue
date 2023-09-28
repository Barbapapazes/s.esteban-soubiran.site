<script lang="ts" setup>
const { data, refresh, pending } = await useFetch('/api/urls')
</script>

<template>
  <UContainer as="section" class="py-4 flex flex-col gap-8">
    <h1 class="text-4xl text-gray-900 dark:text-gray-50 font-bold">
      Shorts
    </h1>

    <ShortsForm @refresh="refresh" />

    <UButton @click="refresh" icon="i-heroicons-arrow-path" class="self-start" :loading="pending">
      Refresh
    </UButton>

    <ShortsTable v-if="data" :data="data" @refresh="refresh" :loading="pending" />

  </UContainer>
</template>
