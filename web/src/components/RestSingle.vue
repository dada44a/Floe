<script setup>
import { ref } from "vue";
import makeRequest from "@/helpers/AxiosEndPoints.mjs";

/**
 * Reactive data variables used throughout the component:
 *
 * @property {import('vue').Ref<string>} requestMethod - Stores the HTTP method type for the request, initialized with "GET".
 * @property {import('vue').Ref<string>} url - Stores the URL for the request.
 * @property {Array<string>} buttons - Array of button options for data selection (Param, Header, Auth, Body).
 * @property {import('vue').Ref<number | null>} activeButton - Keeps track of the currently active button by its index.
 * @property {import('vue').Ref<Array<{ key: string, value: string }>>} paramData - Stores key-value pairs for query parameters.
 * @property {import('vue').Ref<Object>} paramResult - Stores the processed query parameters after being reduced into an object.
 * @property {import('vue').Ref<Array<{ key: string, value: string }>>} headerData - Stores key-value pairs for headers.
 * @property {import('vue').Ref<Object>} headerResult - Stores the processed headers after being reduced into an object.
 * @property {import('vue').Ref<string>} bodyData - Stores the body content of the request, initialized as an empty string.
 * @property {import('vue').Ref<boolean>} authMenuToggle - Tracks the visibility state of the authentication menu.
 * @property {import('vue').Ref<string>} authKey - Stores the key for authentication (e.g., API key).
 * @property {import('vue').Ref<string>} authValue - Stores the value for authentication (e.g., API token).
 * @property {import('vue').Ref<string>} authType - Stores the type of authentication being used (e.g., "basic", "bearer", "api").
 * @property {import('vue').Ref<string>} dataRackState - Stores the current selected data rack state ("param", "header", "auth", "body").
 * @property {import('vue').Ref<string>} response - Stores the API response or error messages as a formatted string.
 */

const requestMethod = ref("GET");
const url = ref("");
const buttons = ["Param", "Header", "Auth", "Body"];
const activeButton = ref(null);
const paramData = ref([{ key: "", value: "" }]);
const paramResult = ref({});
const headerData = ref([{ key: "", value: "" }]);
const headerResult = ref({});
const bodyData = ref("");
const authMenuToggle = ref(true);
const authKey = ref("");
const authValue = ref("");
const authType = ref("");
const dataRackState = ref("");
const response = ref("");

/**
 * Function to set the active button.
 * @param {number} index - The index of the selected button.
 */
const setActive = (index) => {
  activeButton.value = index;
};

/**
 * Function to add a new key-value pair input for query parameters.
 */
const addParamInput = () => {
  paramData.value.push({ key: "", value: "" });
};

/**
 * Function to add a new key-value pair input for headers.
 */
const addHeaderInput = () => {
  headerData.value.push({ key: "", value: "" });
};

/**
 * Function to toggle the visibility of the authentication menu.
 */
const authMenuSwitch = () => {
  authMenuToggle.value = !authMenuToggle.value;
};

/**
 * Updates the processed query parameters by reducing the array of key-value pairs into an object.
 */
const updateParamResult = () => {
  paramResult.value = paramData.value.reduce((acc, { key, value }) => {
    if (key) acc[key] = value;
    return acc;
  }, {});
};

/**
 * Updates the processed headers by reducing the array of key-value pairs into an object.
 */
const updateHeaderResult = () => {
  headerResult.value = headerData.value.reduce((acc, { key, value }) => {
    if (key) acc[key] = value;
    return acc;
  }, {});
};

/**
 * Function to select which data type (Param, Header, Auth, or Body) is currently active.
 * @param {string} option - The data type to select.
 */
const selectDataRack = (option) => {
  switch (option) {
    case "Param":
      dataRackState.value = "param";
      break;
    case "Header":
      dataRackState.value = "header";
      break;
    case "Auth":
      dataRackState.value = "auth";
      break;
    case "Body":
      dataRackState.value = "body";
      break;
    default:
      console.log("No such option exists");
  }
};

/**
 * Function to select the authentication method (basic, bearer, api).
 * @param {string} option - The authentication method to use.
 */
const selectAuthMethod = (option) => {
  // Reset authData values
  authKey.value = "";
  authValue.value = "";

  // Set authType based on the provided option
  if (["basic", "bearer", "api"].includes(option)) {
    authType.value = option;
  } else {
    authType.value = ""; // Reset if the option is invalid
  }
};

/**
 * Function to send the HTTP request using the selected method, URL, parameters, headers, body, and authentication data.
 */
const sendRequest = async () => {
  try {
    const method = requestMethod.value;
    const requestBody =
      method === "POST" || method === "PUT" ? JSON.parse(bodyData.value || "{}") : {};

    const responses = await makeRequest(
      method,
      url.value,
      requestBody, // Only send body for POST/PUT
      paramResult.value,
      headerResult.value,
      { type: authType.value, key: authKey.value, value: authValue.value }
    );
    response.value = JSON.stringify(responses, null, 2); // Store the complete response as a formatted string
  } catch (error) {
    console.error("Request failed:", error);
    response.value = `Error: ${error.message}`; // Show error in response area
  }
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-2 items-center">
      <!-- Select for HTTP methods -->
      <select class="select select-secondary w-[150px] max-w-xs" v-model="requestMethod">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <!-- Input for link -->
      <input
        type="text"
        placeholder="Type here"
        v-model="url"
        class="border border-black rounded-xl p-3 w-[78vw]"
      />

      <!-- Button to send request -->
      <button class="btn btn-neutral" @click="sendRequest">Send</button>
    </div>

    <div class="w-full h-[720px] flex">
      <div class="w-3/5 h-full">
        <div class="flex gap-3">
          <!-- Buttons for switching between sections -->
          <button
            v-for="(label, index) in buttons"
            :key="index"
            @click="
              setActive(index);
              selectDataRack(label);
            "
            :class="{ active: activeButton === index }"
            class="font-semibold text-slate-400"
          >
            {{ label }}
          </button>
        </div>

        <div class="h-[690px] mt-[10px]">
          <div id="param" class="p-3" v-if="dataRackState === 'param'">
            <!-- Button to add new input fields -->
            <button class="font-bold text-[30px]" @click="addParamInput">+</button>

            <!-- Dynamic input fields for parameters -->
            <div v-for="(datas, index) in paramData" :key="index" class="flex gap-3 p-2">
              <input
                type="text"
                placeholder="name"
                class="input input-bordered input-secondary w-[500px]"
                v-model="datas.key"
                @input="updateParamResult"
              />
              <input
                type="text"
                placeholder="value"
                class="input input-bordered input-secondary w-[500px]"
                v-model="datas.value"
                @input="updateParamResult"
              />
            </div>
          </div>

          <div id="header" class="p-3" v-if="dataRackState === 'header'">
            <button class="font-bold text-[30px]" @click="addHeaderInput">+</button>

            <!-- Dynamic input fields for headers -->
            <div v-for="(datas, index) in headerData" :key="index" class="flex gap-3 p-2">
              <input
                type="text"
                placeholder="name"
                class="input input-bordered input-secondary w-[500px]"
                v-model="datas.key"
                @input="updateHeaderResult"
              />
              <input
                type="text"
                placeholder="value"
                class="input input-bordered input-secondary w-[500px]"
                v-model="datas.value"
                @input="updateHeaderResult"
              />
            </div>
          </div>

          <div id="auth" class="h-[680px]" v-if="dataRackState === 'auth'">
            <div id="inputs" class="h-[70px] pt-1">
              <div id="basic" class="flex gap-2" v-if="authType === 'basic'">
                <input
                  type="text"
                  placeholder="Username"
                  v-model="authKey"
                  class="input input-bordered input-secondary w-full"
                />

                <input
                  type="text"
                  placeholder="Password"
                  v-model="authValue"
                  class="input input-bordered input-secondary w-full"
                />
              </div>

              <div id="bearer" class="flex gap-2" v-if="authType === 'bearer'">
                <input
                  type="text"
                  v-model="authValue"
                  placeholder="Token"
                  class="input input-bordered input-secondary w-full"
                />
              </div>
              <div id="api" class="flex gap-2" v-if="authType === 'api'">
                <input
                  type="text"
                  placeholder="Header Name"
                  v-model="authKey"
                  class="input input-bordered input-secondary w-full"
                />
                <input
                  type="text"
                  v-model="authValue"
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
                    <a
                      @click.prevent="
                        authMenuSwitch();
                        selectAuthMethod('none');
                      "
                      >None</a
                    >
                  </li>
                  <li>
                    <a
                      @click.prevent="
                        authMenuSwitch();
                        selectAuthMethod('basic');
                      "
                      >Basic Auth</a
                    >
                  </li>
                  <li>
                    <a
                      @click.prevent="
                        authMenuSwitch();
                        selectAuthMethod('bearer');
                      "
                      >Bearer Token</a
                    >
                  </li>
                  <li>
                    <a
                      @click.prevent="
                        authMenuSwitch();
                        selectAuthMethod('api');
                      "
                      >API Key</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div id="body" class="pt-1" v-if="dataRackState === 'body'">
            <textarea
              class="textarea textarea-primary"
              placeholder="Text Here"
              rows="23"
              cols="120"
              v-model="bodyData"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Response Section -->
      <div class="w-2/5 p-3 flex flex-col items-start gap-2">
        <button class="font-semibold">Response</button>
        <textarea
          class="textarea textarea-primary"
          placeholder="Not Sent"
          v-model="response"
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
