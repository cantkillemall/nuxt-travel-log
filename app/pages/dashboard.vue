<script lang="ts" setup>
import { useLocationsStore } from '~~/stores/locations';
import { useSidebarStore } from '~~/stores/sidebar';

const sidebarStore = useSidebarStore();
const locationsStore = useLocationsStore();
const route = useRoute();

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString());
}

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem('isSidebarOpen') === 'true';
  if (route.path !== '/dashboard') {
    locationsStore.refresh();
  }
});
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-10 transition-all duration-300" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div class="flex hover:bg-base-200 hover:cursor-pointer mb-2 p-2" :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }" @click="toggleSidebar">
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="32" />
        <Icon v-else name="tabler:chevron-right" size="32" />
      </div>
      <div class="flex flex-col gap-2">
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Locations"
          icon="tabler:map"
          href="/dashboard"
        />
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Add Location"
          icon="tabler:circle-plus-filled"
          href="/dashboard/add"
        />
        <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-8 w-full" />
        </div>
        <div
          v-if="!sidebarStore.loading || sidebarStore.sidebarItems.length"
          class="flex flex-col"
        >
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :show-label="isSidebarOpen"
            :label="item.label"
            :icon="item.icon"
            :href="item.href"
          />
        </div>
        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Sign Out"
          icon="tabler:logout-2"
          href="/sign-out"
        />
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <NuxtPage />
      <AppMap class="flex-1" />
    </div>
  </div>
</template>
