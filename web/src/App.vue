<script setup>
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";

import { computed } from "vue";
const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || "div"; // Fallback to a simple div if no layout is specified
});
</script>

<template>
  <div>
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>
