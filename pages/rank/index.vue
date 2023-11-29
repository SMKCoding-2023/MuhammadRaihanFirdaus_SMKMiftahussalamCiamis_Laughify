<template>
  <section>
    <div class="flex flex-col gap-1 pb-4 mb-4 border-b border-b-base-200">
      <di class="flex items-center justify-center gap-2 font-semibold font-poppins flex-col">
        <div class="flex gap-1">
          <h1 class="text-center text-lg">Rank</h1>
        </div>
      </di>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: `Laughify | Rank`,
});

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
