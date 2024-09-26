<script setup>
import { ref } from "vue";
import axios from "axios";
import Arrow from "@/components/Arrow.vue";

const apiUrl = ref(""); // Better naming
const apiResponse = ref(""); // Better naming

const fetchApiData = async () => {
  apiResponse.value = ""; // Clear previous response
  try {
    const res = await axios.get(apiUrl.value);
    apiResponse.value = JSON.stringify(res.data, null, 2); // Beautified JSON response
  } catch (error) {
    apiResponse.value = `Error: ${error.message}`; // Error handling
  }
};
</script>
<template>
  <div class="h-[789px] flex">
    <div
      class="h-full lg:w-1/2 text-[50px] lg:text-[70px] font-bold flex flex-col items-start justify-center p-5 ml-[50px]"
    >
      <p>Effortless API</p>
      <p>Testing with Floe</p>
      <p class="text-[20px] font-semibold">
        Experience fast, reliable, and easy-to-use HTTP client features for developers at
        every level.
      </p>

      <div class="flex gap-2 mt-3">
        <RouterLink to="/app"
          ><button class="btn btn-accent text-[18px] h-[60px] w-[150px]">
            Go to App
          </button>
        </RouterLink>
        <a href="http://localhost:5174/"
          ><button class="btn btn-ghost text-[18px] h-[60px] w-[150px]">
            Learn More
          </button></a
        >
      </div>
    </div>

    <div class="w-1/2 lg:flex flex-col items-center justify-center gap-3 hidden">
      <div class="flex gap-2">
        <button class="btn btn-outline btn-secondary h-[60px]" @click="fetchApiData">
          <p class="text-black">GET</p>
        </button>
        <input
          v-model="apiUrl"
          type="text"
          placeholder="Type here"
          class="input input-bordered input-secondary w-full max-w-xs h-[60px]"
        />
      </div>
      <textarea
        v-model="apiResponse"
        class="textarea textarea-primary w-[300px]"
        rows="5"
        placeholder="response"
      ></textarea>
    </div>
  </div>
</template>
