<script setup lang="ts">
import { productQuery } from "~/sanity/queries";
import type { ProductQueryResult } from "~/sanity/types";

const { data: product } = await useSanityQuery<ProductQueryResult>(
  productQuery,
  {
    slug: useRoute().params.slug,
  },
);

useSiteMetadata({
  title: product?.value?.seoTitle || product?.value?.name,
  description: product?.value?.seoDescription,
});
</script>

<template>
  <div class="my-12 lg:my-24" v-if="product">
    <div class="container">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div v-if="product.image?.asset" class="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          <SanityImage
            :asset-id="product.image.asset._ref"
            auto="format"
            :width="800"
            :height="800"
            class="h-full w-full object-cover"
            :alt="product.image.alt || product.name || ''"
          />
        </div>

        <div class="flex flex-col justify-center">
          <span
            v-if="product.category?.name"
            class="text-sm font-medium uppercase tracking-wider text-gray-500"
          >
            {{ product.category.name }}
          </span>
          <h1
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {{ product.name }}
          </h1>
          <p
            v-if="product.price"
            class="mt-4 text-2xl font-bold text-black"
          >
            ${{ product.price.toFixed(2) }}
          </p>

          <div
            v-if="product.description"
            class="mt-6 prose prose-a:text-red-500"
          >
            <PortableText :portableText="product.description" />
          </div>

          <div v-if="product.link" class="mt-8">
            <ResolvedLink
              :link="product.link"
              class="rounded-full inline-flex gap-2 items-center bg-black hover:bg-red-500 focus:bg-nuxt py-3 px-6 text-white transition-colors duration-200"
            >
              Buy Now
            </ResolvedLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
