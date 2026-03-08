<script setup lang="ts">
import { navigationQuery } from "~/sanity/queries";
import type { NavigationQueryResult } from "~/sanity/types";

// biome-ignore lint/correctness/noUnusedVariables: used in template
const { data: navigation } =
  await useSanityQuery<NavigationQueryResult>(navigationQuery);
</script>

<template>
  <footer class="bg-gray-50 border-gray-100 border-t">
    <div class="container">
      <div class="py-16 lg:py-20">
        <div
          v-if="navigation?.footerGroups?.length"
          class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
        >
          <div v-for="group in navigation.footerGroups" :key="group._key">
            <h4
              class="text-sm font-semibold uppercase tracking-wider text-gray-900"
            >
              {{ group.title }}
            </h4>
            <ul v-if="group.links?.length" role="list" class="mt-4 space-y-3">
              <li v-for="item in group.links" :key="item._key">
                <ResolvedLink
                  v-if="item.link"
                  :link="item.link"
                  class="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                  {{ item.label }}
                </ResolvedLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center lg:flex-row"
        >
          <h3
            class="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl"
          >
            Built with Sanity + Nuxt.
          </h3>
        </div>
      </div>
    </div>
  </footer>
</template>
