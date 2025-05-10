<script lang="ts" setup>
defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div class="" :data-tip="showLabel ? undefined : label" :class="{ 'tooltip tooltip-right': !showLabel }">
    <NuxtLink :to="href" :class="{ 'bg-base-300': route.path === href, 'justify-center': !showLabel, 'justify-start': showLabel }" class="flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap">
      <Icon :name="icon" size="24" />
      <Transition name="grow">
        <span v-if="showLabel">{{ label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.2s;
}
.grow-leave-active {
  animation: grow 0.2s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
