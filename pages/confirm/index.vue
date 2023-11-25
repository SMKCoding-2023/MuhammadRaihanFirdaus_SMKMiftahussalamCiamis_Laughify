<script setup lang="ts">
const user = useSupabaseUser();
const authStore = useAuthStore();

definePageMeta({
  middleware: "auth",
  layout: "blank",
});

useSeoMeta({
  title: "Waiting for Login....",
});

watch(
  user,
  async () => {
    const req = {
      name: user.value.user_metadata.full_name,
      email: user.value.email,
      image: user.value.user_metadata.avatar_url,
    };
    await authStore.login(req);
    if (authStore.status === false) {
      await authStore.register(req);
    }
    if (authStore.status !== true) {
      return navigateTo("/login");
    }
    return navigateTo("/");
  },
  { immediate: true }
);
</script>
<template>
  <div class="w-full h-screen flex justify-center items-center">
    <span class="loading loading-dots loading-lg"></span>
  </div>
</template>
