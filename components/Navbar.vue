<template>
  <header class="flex flex-row items-center justify-center fixed border-b border-base-300 w-full z-10 h-16 bg-base-100">
    <nav class="flex flex-row items-center justify-between w-[860px] px-4">
      <div class="items-center justify-center flex gap-2 flex-row">
        <label for="my-drawer" tabindex="0" class="btn btn-ghost btn-circle drawer-butto md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <NuxtLink to="/" class="text-amber-800/70">
          <span class="font-[900] text-xl [text-shadow:_#c79373_1.5px_1.5px,#fad8c3_3px_3px]">LAUGHIFY</span>
        </NuxtLink>
        <div class="hover:bg-base-200 rounded-full w-7 h-7 flex justify-center items-center cursor-pointer text-blue-500 hover:text-blue-600">
          <i class="ri-information-line text-lg"></i>
        </div>
      </div>
      <div class="flex justify-center items-center gap-1">
        <div v-if="user" class="flex">
          <NuxtLink to="/create">
            <div class="btn btn-ghost btn-circle p-0">
              <i class="ri-image-add-line text-lg text-amber-700/80"></i>
            </div>
          </NuxtLink>
          <Avatar />
        </div>
        <div v-else class="flex justify-center items-center gap-1">
          <NuxtLink to="/login">
            <div class="btn btn-ghost btn-circle p-0">
              <i class="text-4xl ri-account-circle-fill"></i>
            </div>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const user = useSupabaseUser();
</script>
