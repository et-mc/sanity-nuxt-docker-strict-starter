<script setup lang="ts">
import { productsQuery } from "~/sanity/queries";
import type { ProductsQueryResult } from "~/sanity/types";

const { data: products } =
  await useSanityQuery<ProductsQueryResult>(productsQuery);

useSiteMetadata({
  title: "Products",
  description: "Browse our product catalog.",
});
</script>

<template>
  <div class="my-12 lg:my-24">
    <div class="container">
      <div class="pb-6 border-b border-gray-100">
        <h1
          class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl"
        >
          Products
        </h1>
      </div>

      <div
        v-if="products && products.length > 0"
        class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="product in products"
          :key="product._id"
          :to="`/products/${product.slug?.current}`"
          class="group rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
        >
          <div v-if="product.image?.asset" class="aspect-video bg-gray-50">
            <SanityImage
              :asset-id="product.image.asset._ref"
              auto="format"
              :width="600"
              :height="400"
              class="h-full w-full object-cover"
              :alt="product.image.alt || product.name || ''"
            />
          </div>
          <div class="p-6">
            <span
              v-if="product.category?.name"
              class="text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              {{ product.category.name }}
            </span>
            <h2
              class="mt-1 text-xl font-semibold text-gray-900 group-hover:text-red-500 transition-colors"
            >
              {{ product.name }}
            </h2>
            <p v-if="product.price" class="mt-2 text-lg font-bold text-black">
              ${{ product.price.toFixed(2) }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="mt-12">
        <p class="text-gray-500">No products yet.</p>
      </div>
    </div>
  </div>
</template>
