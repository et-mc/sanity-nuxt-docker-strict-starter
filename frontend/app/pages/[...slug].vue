<script lang="ts" setup>
import { toPlainText } from "@portabletext/toolkit";
import {
  productQuery,
  productsQuery,
  collectionBySlugQuery,
  productsByCategoryQuery,
} from "~/sanity/queries";
import type {
  ProductQueryResult,
  ProductsQueryResult,
  CollectionBySlugQueryResult,
  ProductsByCategoryQueryResult,
} from "~/sanity/types";

type ProductListItem = NonNullable<ProductsQueryResult>[number];

definePageMeta({ name: "store-catch-all" });

const route = useRoute();
const segments = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug];

const { settings: storeSettings, productUrl, collectionUrl } =
  await useStoreUrl();

const baseSlug = storeSettings.value?.storeBaseSlug || null;
const useCollections = storeSettings.value?.useCollectionRouting || false;
const createCollectionPages =
  storeSettings.value?.createCollectionPages || false;

// Determine what this URL resolves to based on store settings
// Possible patterns:
//   /[base]                         → store index
//   /[base]/[collection]            → collection page (if createCollectionPages)
//   /[base]/[collection]/[product]  → product (if useCollectionRouting)
//   /[base]/[product]               → product (if !useCollectionRouting)
//   /[collection]                   → collection page (no base, if createCollectionPages)
//   /[collection]/[product]         → product (no base, useCollectionRouting)
//   /[product]                      → handled by [slug].vue if no base, not this catch-all

type ResolvedView =
  | { type: "storeIndex" }
  | { type: "collection"; slug: string }
  | { type: "product"; slug: string }
  | { type: "notFound" };

function resolveView(): ResolvedView {
  const path = [...segments];

  // Strip base slug if it matches
  if (baseSlug && path[0] === baseSlug) {
    path.shift();
  } else if (baseSlug) {
    // URL doesn't start with base slug — not a store route
    return { type: "notFound" };
  }

  if (path.length === 0) {
    return { type: "storeIndex" };
  }

  const first = path[0];
  const second = path[1];

  if (path.length === 1 && first) {
    // Could be a collection page or a product (depends on settings)
    if (createCollectionPages) {
      // Try collection first, fall back to product
      return { type: "collection", slug: first };
    }
    return { type: "product", slug: first };
  }

  if (path.length === 2 && useCollections && second) {
    return { type: "product", slug: second };
  }

  return { type: "notFound" };
}

const view = resolveView();

// Fetch data based on resolved view
const product = ref<ProductQueryResult | null>(null);
const collection = ref<CollectionBySlugQueryResult | null>(null);
const products = ref<ProductListItem[] | null>(null);

if (view.type === "product") {
  const { data } = await useSanityQuery<ProductQueryResult>(productQuery, {
    slug: view.slug,
  });
  product.value = data.value;
} else if (view.type === "collection") {
  const { data: colData } =
    await useSanityQuery<CollectionBySlugQueryResult>(collectionBySlugQuery, {
      slug: view.slug,
    });

  if (colData.value) {
    collection.value = colData.value;
    const { data: prodData } =
      await useSanityQuery<ProductsByCategoryQueryResult>(
        productsByCategoryQuery,
        { categoryId: colData.value._id }
      );
    products.value = prodData.value as ProductListItem[] | null;
  } else {
    // Not a collection — try as a product
    const { data: prodData } = await useSanityQuery<ProductQueryResult>(
      productQuery,
      { slug: view.slug }
    );
    product.value = prodData.value;
  }
} else if (view.type === "storeIndex") {
  const { data } = await useSanityQuery<ProductsQueryResult>(productsQuery);
  products.value = data.value as ProductListItem[] | null;
}

// SEO
function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3)}...`;
}

const seoDescription = computed(() => {
  if (product.value?.seoDescription) return product.value.seoDescription;
  if (product.value?.description) {
    const plain = toPlainText(
      product.value.description as Parameters<typeof toPlainText>[0]
    );
    return truncate(plain, 160);
  }
  if (collection.value?.description) {
    return truncate(collection.value.description, 160);
  }
  return undefined;
});

const seoTitle = computed(() => {
  if (product.value) {
    return product.value.seoTitle || product.value.title || undefined;
  }
  if (collection.value) {
    return collection.value.name || undefined;
  }
  return "Products";
});

useSiteMetadata({
  title: seoTitle.value,
  description: seoDescription.value,
});

// 404 if nothing resolved
if (
  view.type === "notFound" ||
  (view.type === "product" && !product.value) ||
  (view.type === "collection" && !collection.value && !product.value)
) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}
</script>

<template>
  <!-- Product detail view -->
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
              v-for="col in product.collections"
              :key="col._id"
              :to="
                storeSettings?.createCollectionPages
                  ? collectionUrl(col.slug ?? '')
                  : undefined
              "
              class="text-sm font-medium text-gray-500 transition-colors"
              :class="
                storeSettings?.createCollectionPages
                  ? 'hover:text-gray-700'
                  : ''
              "
            >
              {{ col.name }}
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

  <!-- Collection listing view -->
  <div v-else-if="collection" class="container my-12 lg:my-24 grid gap-12">
    <div>
      <h1
        class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl"
      >
        {{ collection.name }}
      </h1>
      <p v-if="collection.description" class="mt-4 text-lg text-gray-600">
        {{ collection.description }}
      </p>
    </div>

    <div
      v-if="products?.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <ProductCard
        v-for="prod in products"
        :key="prod._id"
        :product="prod"
      />
    </div>
    <p v-else class="text-gray-500">No products in this collection.</p>
  </div>

  <!-- Store index view -->
  <div v-else-if="products" class="container my-12 lg:my-24 grid gap-12">
    <div>
      <h1
        class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl"
      >
        Products
      </h1>
    </div>

    <div
      v-if="products?.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <ProductCard
        v-for="prod in products"
        :key="prod._id"
        :product="prod"
      />
    </div>
    <p v-else class="text-gray-500">No products found.</p>
  </div>
</template>
