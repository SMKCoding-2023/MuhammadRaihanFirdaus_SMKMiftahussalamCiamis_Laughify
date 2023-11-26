<template>
  <div class="mt-4">
    <article class="flex flex-col">
      <header class="flex flex-col gap-2 mb-2">
        <div class="flex items-start justify-between gap-2">
          <div class="max-w-[70%] text-xs items-center gap-1 flex"></div>
        </div>
      </header>
    </article>
    <div class="mt-4 border-t border-t-base-200">
      <NuxtLink :to="`/user/${post?.users?.name}`" class="flex items-center justify-center text-amber-700/80 overflow-hidden gap-2">
        <img :src="post?.users?.image" :alt="post?.users?.name" class="min-w-[24px] min-h-[24px] rounded object-cover" />
      </NuxtLink>
    </div>
    <button></button>
  </div>
</template>

<script setup lang="ts">
const { post } = defineProps(["post"]);
</script>
