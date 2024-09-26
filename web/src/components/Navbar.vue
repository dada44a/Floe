<script setup>
import Themes from "@/components/Themes.vue";
</script>
<template>
  <div class="h-[80px] p-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <RouterLink to="/"><p class="text-[55px] font-bold">Floe</p></RouterLink>
      <div id="nav" class="flex text-[18px] gap-2">
        <RouterLink to="/terminal">Terminal</RouterLink>
        <RouterLink to="/desktop">Desktop</RouterLink>
        <a href="http://localhost:5174/">Docs</a>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Themes />
      <RouterLink to="/app">
        <button class="btn btn-primary">Go to App</button>
      </RouterLink>
    </div>
  </div>
</template>
