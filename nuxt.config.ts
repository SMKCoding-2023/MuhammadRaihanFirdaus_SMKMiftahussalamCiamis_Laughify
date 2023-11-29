// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" }],
    },
  },
  devtools: { enabled: false },
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image", "@vite-pwa/nuxt", "nuxt-primevue"],
  primevue: {
    options: {
      ripple: true,
    },
    components: {
      include: ["Dialog"],
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/post/*", "/rank", "/shuffle", "/trend", "/hashtag/*", "/user/*"],
    },
  },
  appConfig: {
    SUPABASE_DATABASE_PASSWORD: process.env.SUPABASE_DATABASE_PASSWORD,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
    SITE_URL: process.env.SITE_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  },
  css: ["~/assets/css/main.css", "@/assets/css/font.css", "awesome-notifications/dist/style.css", "primevue/resources/themes/lara-light-teal/theme.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pwa: {
    manifest: {
      name: "Laughify",
      short_name: "Laughify",
      theme_color: "#fff",
      background_color: "#fff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "images/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "images/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "images/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "images/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "images/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "images/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "images/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "images/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
});
