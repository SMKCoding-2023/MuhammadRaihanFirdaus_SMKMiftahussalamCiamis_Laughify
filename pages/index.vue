<template>
  <section>
    <div class="flex flex-col gap-1 pb-4 mb-4 border-b border-b-base-200">
      <di class="flex items-center justify-center gap-2 font-semibold font-poppins flex-col">
        <div class="flex gap-1">
          <i class="ri-fire-fill text-lg"></i>
          <h1 class="text-center text-lg">Hot</h1>
        </div>
      </di>
    </div>
    <section>
      <div class="flex flex-col h-auto">
        {{ posts }}
        <div v-for="post in posts" :key="post.id">
          <CardsPostCard :post="post" />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
useSeoMeta({
  title: "Laughify | Hot Meme",
  ogTitle: "Meme hub",
});

const { data: posts, error } = useFetch("/api/post");
</script>
