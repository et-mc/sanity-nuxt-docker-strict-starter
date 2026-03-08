<script setup lang="ts">
import type { ContactForm } from "~/sanity/types";

defineProps({
  block: {
    type: Object as PropType<ContactForm>,
    required: true,
  },
});

function handleSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("Form submitted:", data);
  alert("Form submission received. Connect your own backend to process it.");
}
</script>

<template>
  <div class="container my-12">
    <div class="max-w-2xl">
      <h2
        v-if="block.heading"
        class="text-3xl font-bold tracking-tight text-black sm:text-4xl"
      >
        {{ block.heading }}
      </h2>
      <p v-if="block.text" class="mt-4 text-lg leading-8 text-gray-600">
        {{ block.text }}
      </p>
      <form class="mt-8 space-y-6" @submit="handleSubmit">
        <div
          v-for="field in block.fields"
          :key="field._key"
          class="flex flex-col gap-2"
        >
          <label :for="field._key" class="text-sm font-medium text-gray-900">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>
          <textarea
            v-if="field.fieldType === 'textarea'"
            :id="field._key"
            :name="field.label"
            :required="field.required || false"
            rows="4"
            class="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            v-else
            :id="field._key"
            :type="field.fieldType || 'text'"
            :name="field.label"
            :required="field.required || false"
            class="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          class="rounded-full bg-black hover:bg-red-500 focus:bg-nuxt py-3 px-6 text-white transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
