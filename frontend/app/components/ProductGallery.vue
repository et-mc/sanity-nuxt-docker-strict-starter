<script lang="ts" setup>
import type { ProductQueryResult } from "~/sanity/types";

type Product = NonNullable<ProductQueryResult>;

const props = defineProps({
  mainImage: {
    type: Object as PropType<Product["mainImage"]>,
    required: true,
  },
  gallery: {
    type: Array as PropType<Product["gallery"]>,
    default: () => [],
  },
});

const selectedIndex = ref<number | null>(null);

const allImages = computed(() => {
  const images: Array<{
    _key: string;
    asset?: { _ref: string } | null;
    alt?: string | null;
  }> = [];

  if (props.mainImage?.asset?._ref) {
    images.push({
      _key: "main",
      asset: props.mainImage.asset,
      alt: props.mainImage.alt,
    });
  }

  if (props.gallery) {
    for (const img of props.gallery) {
      if (img?.asset?._ref) {
        images.push({
          _key: img._key,
          asset: img.asset,
          alt: img.alt,
        });
      }
    }
  }

  return images;
});

const activeImage = computed(() => {
  if (selectedIndex.value !== null && allImages.value[selectedIndex.value]) {
    return allImages.value[selectedIndex.value];
  }
  return allImages.value[0] ?? null;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
      <SanityImage
        v-if="activeImage?.asset?._ref"
        :asset-id="activeImage.asset._ref"
        :alt="activeImage.alt || ''"
        auto=""
        format
        class="w-full h-full object-cover"
      />
    </div>
    <div
      v-if="allImages.length > 1"
      class="grid grid-cols-4 sm:grid-cols-5 gap-2"
    >
      <button
        v-for="(image, index) in allImages"
        :key="image._key"
        type="button"
        class="aspect-square rounded-lg overflow-hidden border-2 transition-colors"
        :class="
          (selectedIndex ?? 0) === index
            ? 'border-gray-900'
            : 'border-transparent hover:border-gray-300'
        "
        @click="selectedIndex = index"
      >
        <SanityImage
          v-if="image.asset?._ref"
          :asset-id="image.asset._ref"
          :alt="image.alt || ''"
          auto=""
          format
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>
