<template>
  <NuxtLink :to="`/hashtag/${hashtag}`">
    <div class="w-full p-3 border border-dashed border-black rounded-lg bg-base-300">
      <h3 class="px-3 font-poppins text-lg font-semibold">#{{ hashtag }}</h3>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { hashtag } = defineProps(["hashtag"]);
</script>
