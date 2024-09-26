/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import fluid, { extract } from 'fluid-tailwind'
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    extract
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    fluid
  ],
  daisyui:{
    themes:["cymk"]
  }
}

