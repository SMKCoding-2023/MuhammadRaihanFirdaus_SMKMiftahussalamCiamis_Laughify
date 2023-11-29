<template>
  <section>
    <div class="flex flex-col gap-1 pb-4 mb-4 border-b border-b-base-200">
      <di class="flex items-center justify-center gap-2 font-semibold font-poppins flex-col">
        <div class="flex gap-1">
          <h1 class="text-center text-lg"><a href="/shuffle" class="text-amber-700/80 hover:underline">Refresh</a> the page to get more random meme</h1>
        </div>
      </di>
    </div>
    <section>
      <div class="flex flex-col h-auto w-full gap-3">
        <div v-for="post in shuffleMeme?.data" :key="post.id">
          <CardsPostCard :post="post" />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

const { data: shuffleMeme, error } = useFetch(`/api/shuffle`, {
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

useSeoMeta({
  title: `Laughify | Random Meme`,
});

definePageMeta({
  middleware: "auth",
});
</script>
