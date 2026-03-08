<script setup lang="ts">
import type { Hero } from "~/sanity/types";

defineProps({
  block: {
    type: Object as PropType<Hero>,
    required: true,
  },
});
</script>

<template>
  <div class="relative overflow-hidden bg-gray-50">
    <SanityImage
      v-if="block.image?.asset"
      :asset-id="block.image.asset._ref"
      auto="format"
      class="absolute inset-0 h-full w-full object-cover opacity-20"
      :alt="block.image.alt || ''"
    />
    <div class="container relative py-20 lg:py-32">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          v-if="block.heading"
          class="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-7xl"
        >
          {{ block.heading }}
        </h1>
        <p
          v-if="block.tagline"
          class="mt-6 text-lg leading-8 text-gray-600 lg:text-xl"
        >
          {{ block.tagline }}
        </p>
        <div
          v-if="block.link && block.buttonText"
          class="mt-10 flex items-center justify-center"
        >
          <ResolvedLink
            :link="block.link"
            class="rounded-full flex gap-2 items-center bg-black hover:bg-red-500 focus:bg-nuxt py-3 px-6 text-white transition-colors duration-200"
          >
            {{ block.buttonText }}
          </ResolvedLink>
        </div>
      </div>
    </div>
  </div>
</template>
