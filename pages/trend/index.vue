<template>
  <section>
    <div class="flex flex-col gap-1 pb-4 mb-4 border-b border-b-base-200">
      <di class="flex items-center justify-center gap-2 font-semibold font-poppins flex-col">
        <div class="flex gap-1">
          <i class="ri-pulse-line text-lg"></i>
          <h1 class="text-center text-lg">Trend</h1>
        </div>
        <p>The most popular hashtags used</p>
      </di>
    </div>
    <section>
      <div class="flex flex-col h-auto w-full gap-3">
        <div v-for="hashtag in topHashtags?.data" :key="hashtag">
          <CardsHashtagCard :hashtag="hashtag" />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

useSeoMeta({
  title: "Laughify | Trend",
});

const { data: topHashtags, error } = useFetch(`/api/trend`, {
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>
