<template>
  <div class="mt-4">
    <article class="flex flex-col">
      <header class="flex flex-col gap-2 mb-2">
        <div class="flex items-start justify-between gap-2">
          <div class="max-w-[70%] text-xs items-center gap-1 flex">
            <NuxtLink :to="`/user/${post?.users?.name}`" class="flex items-center justify-center text-amber-700/80 overflow-hidden gap-2">
              <img :src="post?.users?.image" :alt="post?.users?.name" class="w-6 h-6 rounded object-cover" />
              <span class="font-semibold font-poppins overflow-hidden text-ellipsis">{{ post?.users?.name }}</span>
            </NuxtLink>
            <span class="colot-gray-700">.</span>
          </div>
          <div class="hover:bg-base-200 rounded-full w-7 h-7 flex justify-center items-center cursor-pointer text-blue-500 hover:text-blue-600">
            <svg class="w-3 h-3" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.055 32.055" xml:space="preserve">
              <g>
                <path
                  d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
  C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
  s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
  c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
                />
              </g>
            </svg>
          </div>
        </div>
        <NuxtLink :to="`/post/${post?.id}`">
          <h2 class="font-semibold font-poppins text-xl hover:underline break-words">{{ post?.title }}</h2>
        </NuxtLink>
      </header>
      <!-- //TODO Checking if Image or Videeo -->
      <div>
        <div class="w-full overflow-hidden relative">
          <NuxtImg :src="post?.url" :alt="post?.title" class="w-full rounded-md" />
        </div>
      </div>
    </article>
    <div class="mt-4 border-t border-t-base-200"></div>
    <button></button>
  </div>
</template>

<script setup lang="ts">
const { post } = defineProps(["post"]);
</script>
