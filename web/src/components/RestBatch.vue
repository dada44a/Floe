<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-2 items-center">
      <!-- Select for HTTP methods -->
      <select class="select select-secondary w-[150px] max-w-xs">
        <option selected>GET</option>
      </select>

      <!-- Input for link -->

      <!-- Button to send request -->
      <button class="btn btn-neutral w-[81vw] bg-black hover:bg-black" @click="send">
        <span class="text-white">Send Request</span>
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
                placeholder="www.example.com"
                class="input input-bordered input-secondary w-full"
                v-model="datas.key"
              />
            </div>
          </div>
          <div id="auth" class="h-[680px]" v-if="dataRackState === 'auth'">
            <button class="font-bold text-[30px]" @click="addAuthData">+</button>
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
          v-model="response"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue"; // Importing the 'ref' function from Vue to create reactive variables.

/**
 * RequestData represents the structure of the data used for making requests.
 * It includes:
 * - paramData: Array of key-value pairs for query parameters (links).
 * - headerData: Array of key-value pairs for headers (authorization or custom data).
 * - bodyData: String content for the request body.
 * - authData: String containing authentication details.
 */

/** @type {RequestData} */
const LinkWithAuth = ref([]); // Reactive array to store links combined with authentication data.
const buttons = ["Links", "Auth"]; // The buttons array contains two options: "Links" and "Auth".
const activeButton = ref(); // Tracks which button is currently active (selected).
const linksData = ref([{ key: "" }]); // Array to hold query parameters (links). Starts with an empty input field.

const authDataArray = ref([]); // Stores the authentication key-value pairs.
const authMenuToggle = ref(true); // Controls the visibility of the authentication input form.
const authKey = ref(""); // Temporary variable to hold the authentication key input by the user.
const authValue = ref(""); // Temporary variable to hold the authentication value input by the user.
const authType = ref(""); // Tracks the type of authentication method selected (e.g., basic, bearer).
const dataRackState = ref(""); // Keeps track of whether "Links" or "Auth" options are selected.
const response = ref([]);

/**
 * Handles selecting the data view (Links or Auth) based on user input.
 * @param {string} option - The selected option, either "Links" or "Auth".
 */
const selectDataRack = (option) => {
  switch (option) {
    case "Links":
      dataRackState.value = "links"; // If "Links" is selected, set the state to show links input.
      break;
    case "Auth":
      dataRackState.value = "auth"; // If "Auth" is selected, set the state to show authentication input.
      break;
    default:
      console.log("no such option exist"); // Handle invalid selections.
  }
};

/**
 * Sets the authentication method (basic, bearer, or API key).
 * @param {string} option - The selected authentication type.
 */
const selectAuthMethod = (option) => {
  switch (option) {
    case "basic":
      authType.value = "basic"; // Set the authentication type to 'basic'.
      break;
    case "bearer":
      authType.value = "bearer"; // Set the authentication type to 'bearer'.
      break;
    case "api":
      authType.value = "api"; // Set the authentication type to 'api'.
      break;
    default:
      authType.value = ""; // Clear the authentication type if an invalid option is chosen.
  }
};

/**
 * Sets the currently active button (either Links or Auth) when clicked.
 * @param {number} index - The index of the button clicked.
 */
const setActive = (index) => {
  activeButton.value = index; // Set the active button index for styling or state management.
};

/**
 * Adds a new empty input field for a link (query parameter).
 * This allows the user to input multiple links.
 */
const addLinksInput = () => {
  linksData.value.push({ key: "" }); // Add a new empty link input to the list.
};

/**
 * Adds authentication data to the array.
 * The method collects the current key-value pair and authentication type,
 * then stores them in the authDataArray.
 */
const addAuthData = () => {
  authMenuSwitch(); // Toggle the authentication menu off after data is added.
  authDataArray.value.push({
    key: authKey.value, // Save the entered authentication key.
    value: authValue.value, // Save the entered authentication value.
    type: authType.value, // Save the selected authentication type.
  });
  // Reset the input fields for the next entry.
  authKey.value = "";
  authValue.value = "";
  authType.value = "";
};

/**
 * Toggles the authentication input form between showing and hiding.
 * Called when the user adds or cancels authentication input.
 */
const authMenuSwitch = () => {
  authMenuToggle.value = !authMenuToggle.value; // Switch the state between true and false.
};

/**
 * Triggers the process of sending data. If no LinkWithAuth data exists, it adds them.
 */
const send = () => {
  if (LinkWithAuth.value.length <= 0) {
    addLinkWithAuth(); // Ensure that the combined links and authentication data are prepared.
    requestProcess();
  }
};

/**
 * Combines the links and authentication data into the LinkWithAuth array.
 * Links and their corresponding authentication data are paired together.
 */
const addLinkWithAuth = () => {
  LinkWithAuth.value = []; // Clear any existing data before adding new ones.
  linksData.value.forEach((link, i) => {
    const auth = authDataArray.value[i] || {}; // Retrieve the corresponding auth data or default to an empty object.
    LinkWithAuth.value.push({
      link: link.key, // Link key (query parameter).
      key: auth.key || "N/A", // Use 'N/A' if there's no authentication key.
      value: auth.value || "N/A", // Use 'N/A' if there's no authentication value.
      type: auth.type || "N/A", // Use 'N/A' if there's no authentication type.
    });
  });
};

const requestProcess = () => {
  LinkWithAuth.value.forEach((object) => {
    switch (
      object.type.toLowerCase() // Ensures type comparison is case-insensitive
    ) {
      case "basic":
        axios
          .get(object.link, {
            headers: {
              Authorization: `Basic ${btoa(`${object.key}:${object.value}`)}`,
            },
          })
          .then((res) => response.value.push(JSON.stringify(res.data)))
          .catch((error) => {
            console.error(`Error with basic auth request to ${object.link}:`, error);
          });
        break;

      case "bearer":
        axios
          .get(object.link, {
            headers: {
              Authorization: `Bearer ${object.value}`,
            },
          })
          .then((res) => response.value.push(JSON.stringify(res.data)))
          .catch((error) => {
            console.error(`Error with bearer auth request to ${object.link}:`, error);
          });
        break;

      case "api":
        axios
          .get(object.link, {
            headers: {
              [object.key]: object.value,
            },
          })
          .then((res) => response.value.push(JSON.stringify(res.data)))
          .catch((error) => {
            console.error(`Error with API key request to ${object.link}:`, error);
          });
        break;

      default:
        axios
          .get(object.link)
          .then((res) => response.value.push(JSON.stringify(res.data)))
          .catch((error) => {
            console.error(`Error with unauthenticated request to ${object.link}:`, error);
          });
    }
  });
};
</script>

<style scoped>
.active {
  color: black;
  border-bottom: 1px solid red;
  /* Set the text color to black for the active button */
}
</style>
