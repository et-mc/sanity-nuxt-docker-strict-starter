<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-gray-50 border border-gray-100 rounded-xl p-6">
    <h3 v-if="block.title" class="text-lg font-semibold mb-2">
      {{ block.title }}
    </h3>
    <p v-if="block.description" class="text-gray-600 text-sm">
      {{ block.description }}
    </p>
    <ResolvedLink
      v-if="block.link"
      :link="block.link"
      class="inline-block mt-4 text-sm font-medium text-red-500 hover:text-red-600"
    >
      Learn more
    </ResolvedLink>
  </div>
</template>
