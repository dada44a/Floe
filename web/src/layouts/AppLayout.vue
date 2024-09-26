<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { useSidebarToggle } from "@/stores/counter.js";
const toggle = useSidebarToggle();
</script>
<template>
  <div class="flex">
    <Sidebar />
    <div class="p-5 ml-[90px]">
      <slot />
    </div>
  </div>
</template>
