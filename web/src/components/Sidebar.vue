<script setup>
import { useSidebarToggle } from "@/stores/counter.js";
import { RouterLink } from "vue-router";
import Bookmark from "@/components/Bookmark.vue";

const toggle = useSidebarToggle();
</script>
<template>
  <div
    class="border bg-[#e9e7e7] h-[100vh] fixed"
    :class="toggle.toggleState ? 'w-[250px]' : 'w-[80px]'"
  >
    <!-- Not Toggled -->
    <div
      class="flex w-full h-full flex-col items-center justify-between p-3"
      v-if="!toggle.toggleState"
    >
      <div class="logo">
        <p class="text-[50px] font-bold">F</p>
      </div>
      <div>
        <button @click="toggle.toggle"><p class="text-[30px] font-bold">>></p></button>
      </div>
      <div class="flex flex-col justify-center items-center gap-10 w-full">
        <p class="text-[40px] font-bold">+</p>
        <RouterLink to="/app/"> <p class="text-[25px] font-bold">REST</p></RouterLink>
        <p class="text-[25px] font-bold">GQL</p>
        <button><Bookmark /></button>
      </div>

      <div class="h-[200px] border"></div>

      <div class="flex flex-col items-center w-full">
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content w-[50px] rounded-full">
            <span class="text-3xl">D</span>
          </div>
        </div>
      </div>
    </div>

    <!-- toggled -->
    <div
      class="flex w-full h-full flex-col items-center justify-between p-3"
      v-if="toggle.toggleState"
    >
      <div class="logo w-full justify-between flex items-center">
        <p class="text-[50px] font-bold">Floe</p>
        <button @click="toggle.toggle"><p class="text-[30px] font-bold"><<</p></button>
      </div>
      <div class="flex flex-col justify-center items-start gap-10 w-full p-3">
        <p class="text-[22px] font-semibold">
          + <span class="text-[22px]">Collection</span>
        </p>
        <p class="text-[22px] font-semibold">REST API</p>
        <RouterLink to="/app/gql"
          ><p class="text-[22px] font-semibold">GQL API</p></RouterLink
        >
        <button><p class="text-[22px] font-semibold">Bookmarks</p></button>
      </div>

      <div class="h-[200px] border"></div>

      <div class="flex items-start w-full">
        <div class="avatar placeholder flex items-center gap-3">
          <div class="bg-neutral text-neutral-content w-[50px] h-[50px] rounded-full">
            <span class="text-3xl">D</span>
          </div>
          <div class="flex flex-col">
            <p class="font-semibold">Dada44an</p>
            <p>SignOut</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
