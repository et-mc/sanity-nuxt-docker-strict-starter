<script lang="ts" setup>
import { toPlainText } from "@portabletext/toolkit";
import { productQuery } from "~/sanity/queries";
import type { ProductQueryResult } from "~/sanity/types";

const { data: product } = await useSanityQuery<ProductQueryResult>(
  productQuery,
  { slug: useRoute().params.slug }
);

const { collectionUrl, settings: storeSettings } = await useStoreUrl();

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3)}...`;
}

const seoDescription = computed(() => {
  if (product?.value?.seoDescription) return product.value.seoDescription;
  if (product?.value?.description) {
    const plain = toPlainText(
      product.value.description as Parameters<typeof toPlainText>[0]
    );
    return truncate(plain, 160);
  }
  return undefined;
});

useSiteMetadata({
  title: product?.value?.seoTitle || product?.value?.title,
  description: seoDescription.value,
});
</script>

<template>
  <div v-if="product" class="container my-12 lg:my-24">
    <div class="grid lg:grid-cols-2 gap-12">
      <ProductGallery
        :mainImage="product.mainImage"
        :gallery="product.gallery"
      />

      <div class="flex flex-col gap-6">
        <div>
          <div
            v-if="product.collections?.length"
            class="flex flex-wrap gap-2 mb-3"
          >
            <NuxtLink
              v-for="collection in product.collections"
              :key="collection._id"
              :to="
                storeSettings?.createCollectionPages
                  ? collectionUrl(collection.slug ?? '')
                  : undefined
              "
              class="text-sm font-medium text-gray-500 transition-colors"
              :class="
                storeSettings?.createCollectionPages
                  ? 'hover:text-gray-700'
                  : ''
              "
            >
              {{ collection.name }}
            </NuxtLink>
          </div>
          <h1
            class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900"
          >
            {{ product.title }}
          </h1>
          <p v-if="product.sku" class="mt-1 text-sm text-gray-500">
            SKU: {{ product.sku }}
          </p>
        </div>

        <div v-if="product.price != null" class="flex items-baseline gap-3">
          <span class="text-2xl font-semibold text-gray-900">
            ${{ product.price }}
          </span>
        </div>

        <div
          class="prose prose-a:text-red-500 max-w-none"
          v-if="product.description"
        >
          <PortableText :portableText="product.description" />
        </div>

        <ProductVariants
          v-if="product.variants?.length"
          :variants="product.variants"
        />

        <ProductAttributes
          v-if="product.attributes?.length"
          :attributes="product.attributes"
        />
      </div>
    </div>
  </div>
</template>
