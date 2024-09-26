<script setup>
import { ref } from "vue";

/**
 * Stores request-related data, including parameters, headers, body content, and authentication.
 *
 * @typedef {Object} RequestData
 * @property {Array<{ key: string, value: string }>} paramData - Key-value pairs for query parameters, initialized with one empty pair.
 * @property {Array<{ key: string, value: string }>} headerData - Key-value pairs for headers, initialized with one empty pair.
 * @property {string} bodyData - The body content of the request, initialized as an empty string.
 * @property {string} authData - The authentication data, initialized as an empty string.
 */

/** @type {RequestData} */

const buttons = ["Links", "Auth"];
const activeButton = ref();
const linksData = ref([{ key: "", value: "" }]);
const authMenuToggle = ref(true);
const authData = ref(null);
const authType = ref("");
const dataRackState = ref("");

const selectDataRack = (option) => {
  switch (option) {
    case "Links":
      dataRackState.value = "links";
      break;
    case "Auth":
      dataRackState.value = "auth";
      break;
    default:
      console.log("no such option exist");
  }
};

const selectAuthMethod = (option) => {
  switch (option) {
    case "basic":
      authType.value = "basic";
      break;
    case "bearer":
      authType.value = "bearer";
      break;
    case "api":
      authType.value = "api";
      break;
    default:
      authType.value = "";
  }
};

// Function to set the active button
const setActive = (index) => {
  activeButton.value = index;
};

// Function to add a new input pair
const addLinksInput = () => {
  linksData.value.push({ key: "", value: "" });
};

const authMenuSwitch = () => {
  authMenuToggle.value = !authMenuToggle.value;
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-2 items-center">
      <!-- Select for HTTP methods -->
      <select class="select select-secondary w-[150px] max-w-xs">
        <option selected>GET</option>
      </select>

      <!-- Input for link -->

      <!-- Button to send request -->
      <button class="btn btn-neutral w-[81vw] bg-black hover:bg-black">
        <span class="text-white"> Send Request</span>
      </button>
    </div>

    <div class="w-full h-[720px] flex">
      <div class="w-3/5 h-full">
        <div class="flex gap-3">
          <!-- Buttons for switching between sections -->
          <button
            v-for="(label, index) in buttons"
            :key="index"
            @click="setActive(index), selectDataRack(label)"
            :class="{ active: activeButton === index }"
            class="font-semibold text-slate-400"
          >
            {{ label }}
          </button>
        </div>

        <div class="h-[690px] mt-[10px]">
          <div id="link" class="p-3" v-if="dataRackState === 'links'">
            <!-- Button to add new input fields -->
            <button class="font-bold text-[30px]" @click="addLinksInput">+</button>

            <!-- Dynamic input fields for parameters -->
            <div v-for="(datas, index) in linksData" :key="index" class="flex gap-3 p-2">
              <input
                type="text"
                placeholder="name"
                class="input input-bordered input-secondary w-[500px]"
                v-model="datas.key"
              />
              <input
                type="text"
                placeholder="value"
                class="input input-bordered input-secondary w-[500px]"
                v-model="datas.value"
              />
            </div>
          </div>

          <div id="auth" class="h-[680px]" v-if="dataRackState === 'auth'">
            <div id="inputs" class="h-[70px] pt-1">
              <div id="basic" class="flex gap-2" v-if="authType === 'basic'">
                <input
                  type="text"
                  placeholder="Username"
                  class="input input-bordered input-secondary w-full"
                />
                <input
                  type="text"
                  placeholder="Password"
                  class="input input-bordered input-secondary w-full"
                />
              </div>

              <div id="bearer" class="flex gap-2" v-if="authType === 'bearer'">
                <input
                  type="text"
                  placeholder="Token"
                  class="input input-bordered input-secondary w-full"
                />
              </div>
              <div id="api" class="flex gap-2" v-if="authType === 'api'">
                <input
                  type="text"
                  placeholder="Header Name"
                  class="input input-bordered input-secondary w-full"
                />
                <input
                  type="text"
                  placeholder="API Key"
                  class="input input-bordered input-secondary w-full"
                />
              </div>
            </div>

            <button
              class="btn btn-active btn-neutral relative top-[550px] left-[10px] p-2"
              @click="authMenuSwitch"
              v-if="!authMenuToggle"
            >
              Auth Types
            </button>
            <ul
              class="menu bg-base-200 rounded-box border border-black w-56 relative top-[380px] left-[9px]"
              v-if="authMenuToggle"
            >
              <li>
                <h2 class="menu-title">Auth Types</h2>
                <ul>
                  <li>
                    <a @click="authMenuSwitch(), selectAuthMethod('none')">None</a>
                  </li>
                  <li>
                    <a @click="authMenuSwitch(), selectAuthMethod('basic')">Basic Auth</a>
                  </li>
                  <li>
                    <a @click="authMenuSwitch(), selectAuthMethod('bearer')"
                      >Bearer Token</a
                    >
                  </li>
                  <li>
                    <a @click="authMenuSwitch(), selectAuthMethod('api')">API Key</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Response Section -->
      <div class="w-2/5 p-3 flex flex-col items-start gap-2">
        <button class="font-semibold">Response</button>
        <textarea
          class="textarea textarea-primary"
          placeholder="Not Sent"
          rows="23"
          cols="76"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: black;
  border-bottom: 1px solid red;
  /* Set the text color to black for the active button */
}
</style>
