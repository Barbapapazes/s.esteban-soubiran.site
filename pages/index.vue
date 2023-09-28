<script lang="ts" setup>
const { data, refresh } = await useFetch('/api/urls')
</script>

<template>
  <UContainer as="section" class="py-4 flex flex-col gap-8">
    <h1 class="text-4xl text-gray-900 dark:text-gray-50 font-bold">
      Keys
    </h1>

    <ShortsForm @refresh="refresh" />

    <ShortsTable v-if="data" :data="data" @refresh="refresh" />
  </UContainer>
</template>
