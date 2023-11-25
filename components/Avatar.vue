<template>
  <div class="flex justify-center items-center flex-row dropdown dropdown-end">
    <div tabindex="0" class="avatar cursor-pointer m-1">
      <div class="w-10 rounded-full">
        <img :src="user?.user_metadata?.avatar_url" :alt="user?.user_metadata?.name" />
      </div>
    </div>
    <div tabindex="0" className="top-14 dropdown-content shadow-sm z-[1] w-52 border-base-300 border min-h-full bg-base-100 flex flex-col justify-center font-quicksand rounded-md">
      <div v-for="(menu, i) in DROPDOWN_MENU" :key="i">
        <NuxtLink :to="menu.to" :class="`w-full px-5 py-2 hover:bg-base-200 font-semibold flex gap-3 items-center cursor-pointer ${menu.classAdditional && [...menu.classAdditional]}`">
          <i :class="menu.iconClass"></i>
          {{ menu.label }}
        </NuxtLink>
      </div>
      <div>
        <div @click="logout" class="w-full px-5 py-2 hover:bg-base-200 font-semibold flex gap-3 items-center cursor-pointer text-red-400">
          <i class="ri-logout-box-line"></i>
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const userStore = useUserStore();

const userId = ref({});

await userStore.getUserByEmail(user.value.email).then(() => {
  userId.value = userStore.user.name;
});

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};

const DROPDOWN_MENU = [
  {
    label: "Profile",
    to: `/user/${userId.value}`,
    iconClass: "ri-emotion-line",
  },
  {
    label: "Setting",
    to: "/setting",
    iconClass: "ri-settings-4-line",
  },
  {
    label: "Upload Meme",
    to: "/upload",
    iconClass: "ri-image-add-line",
    classAdditional: ["text-amber-700/80"],
  },
];
</script>
