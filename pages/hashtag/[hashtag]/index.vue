<template>
  <section>
    <div class="flex flex-col gap-1 pb-4 mb-4 border-b border-b-base-200">
      <di class="flex items-center justify-center gap-2 font-semibold font-poppins flex-col">
        <div class="flex gap-1">
          <h1 class="text-center text-lg">The result for #{{ hashtag }}</h1>
        </div>
      </di>
    </div>
    <section>
      <div class="flex flex-col h-auto w-full gap-3">
        <div v-for="post in hashtagSearch?.data" :key="post.id">
          <CardsPostCard :post="post" />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const nuxtApp = useNuxtApp();

const hashtag = typeof route.params.hashtag === "string" ? route.params.hashtag.toString() : null;

const { data: hashtagSearch, error } = useFetch(`/api/hashtag/${hashtag}`, {
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

useSeoMeta({
  title: `Laughify | Hashtag`,
});

definePageMeta({
  middleware: "auth",
});
</script>
