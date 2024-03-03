<script lang="ts" setup>
import type { Redirect } from '~/types/redirect'

const title = 'Shorts'
useSeoMeta({ title })

const { data, refresh, pending } = await useFetch('/api/redirects')

const toast = useToast()

function addRedirect(redirect: Redirect | null) {
  if (!data.value || !redirect)
    return

  data.value.push(redirect)

  toast.add({
    title: `Redirect '${redirect.name}' added`,
    icon: 'i-ph-check-circle-duotone',
  })
}

function deleteRedirect(redirect: Redirect | null) {
  if (!data.value || !redirect)
    return

  data.value = data.value.filter(r => r.id !== redirect.id)

  toast.add({
    title: `Redirect '${redirect.name}' deleted`,
    icon: 'i-ph-trash-duotone',
  })
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #right>
          <ShortsFormModal @add="addRedirect($event)" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <UButton icon="i-ph-arrows-clockwise" color="white" :loading="pending" @click="refresh">
          Refresh
        </UButton>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <ShortsTable v-if="data" :data="data" :loading="pending" @delete="deleteRedirect($event)" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
