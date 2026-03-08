<script setup lang="ts">
import type { PortableTextMarkComponentProps } from "@portabletext/vue";
import { h } from "vue";
import ResolvedLink from "~/components/ResolvedLink.vue";
import type { BlockContent } from "~/sanity/types";

// biome-ignore lint/correctness/noUnusedVariables: used in template
const portableTextComponents = {
  marks: {
    link: (props: PortableTextMarkComponentProps) =>
      props.value
        ? h(ResolvedLink, { link: props.value.link }, () => props.text)
        : h("span", {}, props.text),
    underline: (props: PortableTextMarkComponentProps) =>
      h("u", {}, props.text),
    code: (props: PortableTextMarkComponentProps) => h("code", {}, props.text),
    "strike-through": (props: PortableTextMarkComponentProps) =>
      h("s", {}, props.text),
  },
};

defineProps<{
  portableText: BlockContent;
}>();
</script>

<template>
  <div v-if="portableText">
    <SanityContent :value="portableText" :components="portableTextComponents" />
  </div>
</template>
