<script lang="ts" setup>
defineProps({
  blocks: {
    type: Array as () => any[],
    required: false,
  },
});
</script>

<template>
  <component
    v-for="block in blocks"
    :key="block._key"
    :is="resolveComponent(block._type) || 'div'"
    :block="block"
  >
    <div v-if="!resolveComponent(block._type)">
      Component doesn't exist for this block type
    </div>
  </component>
</template>
