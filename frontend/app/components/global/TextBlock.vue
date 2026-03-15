<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <h3 v-if="block.heading" class="text-xl font-bold mb-4">
      {{ block.heading }}
    </h3>
    <div v-if="block.content" class="prose prose-a:text-red-500">
      <PortableText :portableText="block.content" />
    </div>
  </div>
</template>
