<template>
  <div class="flex justify-center items-center flex-row relative">
    <div ref="dropdownRef" @click="dropdownToggle" class="avatar cursor-pointer m-1">
      <div class="w-10 rounded-full">
        <img :src="user?.user_metadata?.avatar_url" :alt="user?.user_metadata?.name" />
      </div>
    </div>
    <div :class="`${isShow ? 'absolute' : 'hidden'} right-0 top-14 dropdown-content shadow-sm z-[1] w-52 border-base-300 border min-h-full bg-base-100 font-quicksand rounded-md`">
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
const authStore = useAuthStore();

const isShow = ref(false);
const userName = ref("");
const dropdownRef = ref(null);

await userStore.getUserByEmail(user.value.email).then(() => {
  userName.value = userStore.user.name;
});

const closeDropdownOnOutsideClick = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isShow.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdownOnOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdownOnOutsideClick);
});

const dropdownToggle = () => {
  isShow.value = !isShow.value;
};

const logout = async () => {
  await authStore.logout();
};

const DROPDOWN_MENU = [
  {
    label: "Profile",
    to: `/user/${userName.value}`,
    iconClass: "ri-emotion-line",
  },
  {
    label: "Setting",
    to: "/setting",
    iconClass: "ri-settings-4-line",
  },
  {
    label: "Create Meme",
    to: "/create",
    iconClass: "ri-image-add-line",
    classAdditional: ["text-amber-700/80"],
  },
];
</script>
