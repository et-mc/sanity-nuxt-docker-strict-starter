<script setup lang="ts">
import { linkResolver } from "~/lib/utils";
import type { Link } from "~/sanity/types";

const _NuxtLink = resolveComponent("NuxtLink");

const props = defineProps({
  link: {
    type: Object as PropType<Link>,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});

const _resolvedLink = computed(() => {
  return linkResolver(props.link);
});
</script>

<template>
  <component
    :is="resolvedLink ? NuxtLink : 'span'"
    :class="className"
    v-bind="
      resolvedLink && {
        to: resolvedLink,
        target: link?.openInNewTab ? '_blank' : undefined,
        rel: link?.openInNewTab ? 'noopener noreferrer' : undefined,
      }
    "
  >
    <slot></slot>
  </component>
</template>
