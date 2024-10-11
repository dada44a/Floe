<script setup>
import RestSingle from "@/components/RestSingle.vue";
import { defineAsyncComponent, ref, shallowRef } from "vue";

const batchState = ref(false);
const RestBatch = shallowRef(null);
const activeButton = ref("Query"); // Initialize activeButton to manage the active tab

const batchModeToggle = (option) => {
  batchState.value = option === "Mutation"; // Set batchState based on option
  if (batchState.value && !RestBatch.value) {
    // Dynamically import RestBatch only if it hasn't been imported yet
    RestBatch.value = defineAsyncComponent(() => import("@/components/RestBatch.vue"));
  }
  setActive(option); // Update active button state
};

const setActive = (option) => {
  activeButton.value = option; // Set the active button value
};
</script>

<template>
  <div class="w-[92vw]">
    <div id="tabs" class="w-[130px] flex gap-5 text-semibold p-2 text-[gray]">
      <button
        @click="batchModeToggle('Query')"
        class="font-semibold"
        :class="{ active: activeButton === 'Query' }"
      >
        Query
      </button>
      <button
        @click="batchModeToggle('Mutation')"
        class="font-semibold"
        :class="{ active: activeButton === 'Mutation' }"
      >
        Mutation
      </button>
    </div>

    <div id="rest-api" class="h-[90vh] w-full p-3">
      <RestSingle v-if="!batchState" />
      <component :is="RestBatch" v-if="batchState" />
    </div>
  </div>
</template>

<style scoped>
.active {
  color: black;
  border-bottom: 1px solid red; /* Set the text color to black for the active button */
}
</style>
