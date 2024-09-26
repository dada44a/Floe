import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})


export const useSidebarToggle = defineStore('toggle',()=>{
  const toggleState = ref(false);

  const toggle = () => {
    toggleState.value = !toggleState.value;
  };
  return {toggleState,toggle};
})

