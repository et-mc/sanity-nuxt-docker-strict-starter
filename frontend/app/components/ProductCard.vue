<script lang="ts" setup>
import type { ProductsQueryResult } from "~/sanity/types";

type Product = NonNullable<ProductsQueryResult>[number];

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});

const { productUrl, collectionUrl, settings } = await useStoreUrl();
</script>

<template>
  <NuxtLink
    :to="productUrl(product.slug ?? '', product.collections?.[0]?.slug)"
    class="group block rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
  >
    <div class="aspect-square bg-gray-50 overflow-hidden">
      <SanityImage
        v-if="product.mainImage?.asset?._ref"
        :asset-id="product.mainImage.asset._ref"
        :alt="product.mainImage?.alt || product.title || ''"
        auto=""
        format
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div class="p-4 flex flex-col gap-1">
      <h3 class="font-semibold text-gray-900 group-hover:text-red-500 transition-colors">
        {{ product.title }}
      </h3>
      <div v-if="product.price != null" class="flex items-baseline gap-2">
        <span class="text-lg font-medium text-gray-900">
          ${{ product.price }}
        </span>
      </div>
      <div v-if="product.collections?.length" class="flex flex-wrap gap-1 mt-1">
        <NuxtLink
          v-for="collection in product.collections"
          :key="collection._id"
          :to="
            settings?.createCollectionPages
              ? collectionUrl(collection.slug ?? '')
              : undefined
          "
          class="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5"
          :class="
            settings?.createCollectionPages
              ? 'hover:bg-gray-200 transition-colors'
              : ''
          "
          @click.stop
        >
          {{ collection.name }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLink>
</template>
