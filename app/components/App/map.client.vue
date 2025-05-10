<script lang="ts" setup>
import { CENTER_USA } from '~~/lib/db/constants';

const colorMode = useColorMode();
// const style = 'https://demotiles.maplibre.org/style.json';

const style = computed(() => colorMode.value === 'dark' ? '/styles/dark.json' : 'https://tiles.openfreemap.org/styles/liberty');
// const center = [3.33333, 50.48333];
const zoom = 3;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_USA"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>

<style>

</style>
