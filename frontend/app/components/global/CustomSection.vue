<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    required: true,
  },
});

function colSpanClass(span: number): string {
  const spanMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };
  return spanMap[span] || "col-span-6";
}
</script>

<template>
  <section class="container my-12">
    <h2
      v-if="block.title"
      class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
    >
      {{ block.title }}
    </h2>
    <div class="grid grid-cols-12 gap-6">
      <div
        v-for="column in block.columns"
        :key="column._key"
        :class="colSpanClass(column.span)"
      >
        <BlockRenderer :blocks="column.blocks" />
      </div>
    </div>
  </section>
</template>
