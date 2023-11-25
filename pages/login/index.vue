<script lang="ts" setup>
useSeoMeta({
  title: "Laughify | Login",
});

definePageMeta({
  layout: "blank",
});
</script>

<template>
  <section>
    <div class="container">
      <div class="flex justify-center items-center h-screen">
        <!-- //TODO Make anonym can see '/' -->
        <!-- <NuxtLink to="/" class="absolute top-4 left-4 bg-amber-800/70 text-white h-[45px] w-[45px] flex justify-center items-center rounded-full shadow-lg cursor-pointer">
          <i class="ri-arrow-left-line"></i>
        </NuxtLink> -->
        <FormsLogin />
      </div>
    </div>
  </section>
</template>
