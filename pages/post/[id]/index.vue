<template>
  <section>
    <section>
      <div class="flex flex-col h-auto w-full gap-3">
        <div v-for="post in idSearch?.data" :key="post.id">
          <CardsPostCard :post="post" />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const nuxtApp = useNuxtApp();

const id = typeof route.params.id === "string" ? route.params.id.toString() : null;

const { data: idSearch, error } = useFetch(`/api/post/${id}`, {
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

useSeoMeta({
  title: `Laughify | Post Detail`,
});

definePageMeta({
  middleware: "auth",
});
</script>
