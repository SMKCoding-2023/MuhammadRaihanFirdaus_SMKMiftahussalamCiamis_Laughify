<template>
  <div class="flex justify-center items-center flex-row dropdown dropdown-end">
    <div tabindex="0" class="avatar cursor-pointer m-1">
      <div class="w-10 rounded-full">
        <img :src="user?.user_metadata?.avatar_url" :alt="user?.user_metadata?.name" />
      </div>
    </div>
    <ul tabindex="0" className="mt-28 dropdown-content shadow-sm z-[1] menu p-2 bg-base-100 border border-base-300 w-36 rounded-md">
      <li>
        <button @click="logout" class="text-red-500"><i class="ri-logout-box-line"></i>Log out</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const user = useSupabaseUser();

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>
