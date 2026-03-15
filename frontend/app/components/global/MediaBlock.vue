<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <figure v-if="block.image">
    <SanityImage :asset-id="block.image.asset?._ref" auto="format" class="w-full rounded-lg" />
    <figcaption v-if="block.caption" class="mt-2 text-sm text-gray-500">
      {{ block.caption }}
    </figcaption>
  </figure>
</template>
