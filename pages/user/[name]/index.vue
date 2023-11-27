<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2 border-b border-b-base-300 pb-3">
      <div class="flex justify-between flex-row">
        <div tabindex="0" class="avatar m-1">
          <div class="w-24 rounded-full">
            <NuxtImg :src="userPage?.body?.data?.image" :alt="userPage?.body?.data?.name" />
          </div>
        </div>
        <button class="btn btn-ghost btn-circle p-2">
          <svg class="w-5 h-5" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.055 32.055" xml:space="preserve">
            <g>
              <path
                d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
  C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
  s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
  c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
              />
            </g>
          </svg>
        </button>
      </div>
      <h1 class="font-poppins text-xl font-bold">@{{ userPage?.body?.data?.name }}</h1>
    </div>
  </div>
  <section>
    <div class="flex flex-col h-auto overflow-hidden w-full">
      <div v-for="post in userPage?.body?.data?.posts" :key="post.id">
        <CardsPostCard :post="post" />
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute();

const name = typeof route.params.name === "string" ? route.params.name.toString() : null;

const { data: userPage, error } = useFetch(`/api/user/${name}`);

useSeoMeta({
  title: `Laughify | Profile`,
});

definePageMeta({
  middleware: "auth",
});
</script>
