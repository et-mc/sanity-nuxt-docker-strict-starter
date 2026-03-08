<script lang="ts" setup>
import type { ProductQueryResult } from "~/sanity/types";

type Product = NonNullable<ProductQueryResult>;
type Variant = NonNullable<Product["variants"]>[number];

defineProps({
  variants: {
    type: Array as PropType<Variant[]>,
    required: true,
  },
});
</script>

<template>
  <div class="border-t border-gray-100 pt-6">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
      Variants
    </h3>
    <div class="grid gap-3">
      <div
        v-for="variant in variants"
        :key="variant._key"
        class="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
      >
        <div class="flex flex-col gap-1">
          <span class="font-medium text-gray-900">{{ variant.title }}</span>
          <div v-if="variant.options?.length" class="flex flex-wrap gap-2">
            <span
              v-for="option in variant.options"
              :key="option._key"
              class="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5"
            >
              {{ option.type?.name }}: {{ option.value }}
            </span>
          </div>
        </div>
        <div class="text-right flex flex-col gap-0.5">
          <span v-if="variant.price != null" class="font-semibold text-gray-900">
            ${{ variant.price }}
          </span>
          <span class="text-xs text-gray-500">SKU: {{ variant.sku }}</span>
          <span
            v-if="variant.stock != null"
            class="text-xs"
            :class="variant.stock > 0 ? 'text-green-600' : 'text-red-500'"
          >
            {{ variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
