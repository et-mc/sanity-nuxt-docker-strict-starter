<script setup lang="ts">
import { navigationQuery, settingsQuery } from "~/sanity/queries";
import type {
  NavigationQueryResult,
  SettingsQueryResult,
} from "~/sanity/types";

// biome-ignore lint/correctness/noUnusedVariables: used in template
const { data: settings } =
  await useSanityQuery<SettingsQueryResult>(settingsQuery);

// biome-ignore lint/correctness/noUnusedVariables: used in template
const { data: navigation } =
  await useSanityQuery<NavigationQueryResult>(navigationQuery);
</script>

<template>
  <header
    class="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg"
  >
    <div class="container py-6 sm:px-6">
      <div class="flex items-center justify-between gap-5">
        <NuxtLink class="flex items-center gap-2" to="/">
          <span class="text-2xl pl-2 font-semibold">
            {{ settings?.title }}
          </span>
        </NuxtLink>

        <nav v-if="navigation?.headerLinks?.length">
          <ul
            role="list"
            class="flex items-center gap-4 md:gap-6 leading-5 text-sm md:text-base tracking-tight font-normal"
          >
            <li
              v-for="item in navigation.headerLinks"
              :key="item._key"
            >
              <ResolvedLink
                v-if="item.link"
                :link="item.link"
                class="hover:underline"
              >
                {{ item.label }}
              </ResolvedLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
