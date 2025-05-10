import { defineStore } from 'pinia';

import { useSidebarStore } from './sidebar';

export const useLocationsStore = defineStore('locationStore', () => {
  const { data, status, refresh } = useLazyFetch('/api/locations', {
    key: 'locations',
  });

  const sidebarStore = useSidebarStore();

  watchEffect(() => {
    if (data.value && data.value.length > 0) {
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: 'tabler:map-pin-filled',
        // href: `/dashboard/locations/${location.id}`,
        href: `#`,
      }));
    }

    sidebarStore.loading = status.value === 'pending';
  });
  return {
    locations: data,
    status,
    refresh,
  };
});
