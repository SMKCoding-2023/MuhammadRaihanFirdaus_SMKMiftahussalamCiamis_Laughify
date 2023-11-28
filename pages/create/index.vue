<template>
  <div class="container">
    <FormsCreatePost />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Laughify | Create Meme",
});

definePageMeta({
  middleware: "auth",
});
</script>
