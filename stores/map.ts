import type { MapPoint } from '~~/lib/types';

export const useMapStore = defineStore('mapStore', () => {
  const mapPoints = ref<MapPoint[]>([]);

  async function init() {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');

    const mapInstance = useMap();

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;

      const bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));
      mapInstance.map?.fitBounds(bounds, {
        padding: 60,
      });
    });
  }

  return {
    mapPoints,
    init,
  };
});
