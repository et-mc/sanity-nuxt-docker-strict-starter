<script lang="ts" setup>
import { productsQuery, productCategoriesQuery } from "~/sanity/queries";
import type {
  ProductsQueryResult,
  ProductCategoriesQueryResult,
} from "~/sanity/types";

const { data: products } =
  await useSanityQuery<ProductsQueryResult>(productsQuery);
const { data: categories } =
  await useSanityQuery<ProductCategoriesQueryResult>(productCategoriesQuery);

const { collectionUrl, settings: storeSettings } = await useStoreUrl();

useSiteMetadata({
  title: "Products",
  description: "Browse our product catalog",
});
</script>

<template>
  <div class="container my-12 lg:my-24 grid gap-12">
    <div>
      <h1
        class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl"
      >
        Products
      </h1>
    </div>

    <nav
      v-if="storeSettings?.createCollectionPages && categories?.length"
      class="flex flex-wrap gap-2"
    >
      <NuxtLink
        v-for="category in categories"
        :key="category._id"
        :to="collectionUrl(category.slug ?? '')"
        class="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {{ category.name }}
        <span v-if="category.productCount" class="ml-1 text-gray-400">
          ({{ category.productCount }})
        </span>
      </NuxtLink>
    </nav>

    <div
      v-if="products?.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
    </div>
    <p v-else class="text-gray-500">No products found.</p>
  </div>
</template>
