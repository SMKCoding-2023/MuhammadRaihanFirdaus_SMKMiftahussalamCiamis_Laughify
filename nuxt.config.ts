// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" }],
    },
  },
  devtools: { enabled: false },
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image"],
  appConfig: {
    SUPABASE_DATABASE_PASSWORD: process.env.SUPABASE_DATABASE_PASSWORD,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
    SITE_URL: process.env.SITE_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  },
  css: ["~/assets/css/main.css", "@/assets/css/font.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});