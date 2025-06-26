# React + Vite + Tailwind CSS Setup Guide

Follow these steps to quickly create and set up a React project with Vite, Tailwind CSS, and useful configurations:

---

## 1. Create the React Project

Use Vite to create a new React project with TypeScript template:

```bash
npm create vite@latest
npm install tailwindcss @tailwindcss/vite
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
@tailwind base; 
@tailwind components;
@tailwind utilities;
npx shadcn@latest init
src/lib/utils.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
npm run dev

---

You can just copy and paste the whole content into your README.md file.  
Want me to help with adding badges or screenshots next?
