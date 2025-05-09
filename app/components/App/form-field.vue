<script lang="ts" setup>
defineProps<{
  label: string;
  name: string;
  disabled?: boolean;
  type?: 'text' | 'textarea' | 'number';
  error?: string;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :as="type === 'number' ? 'input' : type || 'input'"
      :name="name"
      :type="type || 'text'"
      :disabled="disabled"
      class="input w-full"
      :class="{
        'input-error': error,
        'input': !type || type === 'text',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="error" class="label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>

<style>
</style>
