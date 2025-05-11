import { defineStore } from 'pinia';

import { useMapStore } from './map';
import { useSidebarStore } from './sidebar';

export const useLocationsStore = defineStore('locationStore', () => {
  const { data, status, refresh } = useLazyFetch('/api/locations', {
    key: 'locations',
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value && data.value.length > 0) {
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: 'tabler:map-pin-filled',
        // href: `/dashboard/locations/${location.id}`,
        href: `#`,
      }));
      mapStore.mapPoints = data.value.map(location => ({
        id: location.id,
        label: location.name,
        lat: location.lat,
        long: location.long,
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
