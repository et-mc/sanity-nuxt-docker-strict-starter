<script lang="ts" setup>
import type { ProductQueryResult } from "~/sanity/types";

type Product = NonNullable<ProductQueryResult>;
type Attribute = NonNullable<Product["attributes"]>[number];

defineProps({
  attributes: {
    type: Array as PropType<Attribute[]>,
    required: true,
  },
});
</script>

<template>
  <div class="border-t border-gray-100 pt-6">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
      Specifications
    </h3>
    <dl class="grid gap-0 divide-y divide-gray-100">
      <div
        v-for="attr in attributes"
        :key="attr._key"
        class="flex justify-between py-2.5"
      >
        <dt class="text-sm text-gray-500">
          {{ attr.definition?.name }}
        </dt>
        <dd class="text-sm font-medium text-gray-900">
          {{ attr.value }}
          <span v-if="attr.definition?.unit" class="text-gray-400">
            {{ attr.definition.unit }}
          </span>
        </dd>
      </div>
    </dl>
  </div>
</template>
