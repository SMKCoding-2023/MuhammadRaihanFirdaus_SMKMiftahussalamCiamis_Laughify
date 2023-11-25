<template>
  <div class="py-4 w-60 md:border-r-base-300 md:border-r min-h-full bg-base-100 flex flex-col overflow-auto font-quicksand">
    <div v-for="(menu, i) in MENUS" :key="i">
      <NuxtLink v-if="!menu.submenuExist" :to="menu.to" class="px-5 py-2 hover:bg-base-200 font-semibold flex gap-3 items-center">
        <i :class="menu.iconClass"></i>
        {{ menu.label }}
      </NuxtLink>
      <div v-else class="collapse collapse-plus font-semibold border-y border-y-base-300 rounded-none">
        <input type="checkbox" />
        <div class="collapse-title font-lg font-poppins">
          {{ menu.label }}
        </div>
        <div v-for="(submenu, i) in menu.submenus" :key="i" class="collapse-content py-0 px-0">
          <NuxtLink :to="submenu.to" class="px-5 py-2 hover:bg-base-200 font-semibold font-quicksand flex gap-3 items-center">
            <i :class="submenu.iconClass"></i>
            {{ submenu.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const MENUS = [
  {
    label: "Hot",
    to: "/",
    iconClass: "ri-fire-fill",
  },
  {
    label: "Trend",
    to: "/trend",
    iconClass: "ri-pulse-line",
  },
  {
    label: "Fresh",
    to: "/fresh",
    iconClass: "ri-time-line",
  },
  {
    label: "Forgotten",
    to: "/forgotten",
    iconClass: "ri-skull-2-fill",
  },
  {
    label: "Explore",
    submenuExist: true,
    submenus: [
      {
        label: "Rank",
        to: "/rank",
        iconClass: "ri-trophy-line",
      },
    ],
  },
];
</script>

<style scoped>
.router-link-active {
  background: rgb(146 64 14 / 0.7);
  color: white;
}
</style>
