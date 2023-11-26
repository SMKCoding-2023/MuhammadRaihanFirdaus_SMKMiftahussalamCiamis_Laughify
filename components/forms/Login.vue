<script setup lang="ts">
const authStore = useAuthStore();

const login = async () => {
  await authStore.OAuthGoogle();
};
</script>

<template>
  <div class="w-80 sm:w-full max-w-sm p-6 bg-white rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.15)] sm:p-6 md:p-8">
    <div class="mb-6">
      <h5 class="text-2xl font-medium text-gray-900 mb-2">Login</h5>
      <span class="text-sm font-normal text-gray-500">Login to continue in our application</span>
    </div>
    <button
      @click="login"
      class="w-full flex justify-center items-center text-white bg-amber-800/70 hover:bg-amber-800/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 gap-4"
    >
      <i class="ri-google-fill text-lg"></i>
      <span>Login with Google</span>
    </button>
  </div>
</template>
