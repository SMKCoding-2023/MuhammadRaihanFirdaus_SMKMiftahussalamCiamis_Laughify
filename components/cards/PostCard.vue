<template>
  <div class="mt-4">
    <article class="flex flex-col">
      <header class="flex flex-col gap-2 mb-2">
        <div class="flex items-start justify-between gap-2">
          <div class="max-w-[70%] text-xs items-center gap-1 flex">
            <NuxtLink :to="`/user/${post?.users?.name}`" class="flex items-center justify-center text-amber-700/80 overflow-hidden gap-2">
              <img :src="post?.users?.image" :alt="post?.users?.name" class="w-6 h-6 rounded object-cover" />
              <span class="font-semibold font-poppins overflow-hidden text-ellipsis hover:underline">{{ post?.users?.name }}</span>
            </NuxtLink>
            <span class="colot-gray-700">.</span>
          </div>
          <div class="flex justify-center items-center flex-row relative">
            <div ref="dropdownRef" @click="dropdownToggle" class="cursor-pointer m-1">
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
            <div :class="`${isShow ? 'absolute' : 'hidden'} right-0 top-8 dropdown-content shadow-sm z-[1] w-36 border-base-300 border min-h-full bg-base-100 font-quicksand rounded-md`">
              <div @click="copyToClipboard()" class="h-full w-full px-5 py-2 hover:bg-base-200 font-semibold flex gap-3 items-center cursor-pointer">
                <i class="ri-share-line"></i>
                Copy link
              </div>
              <div v-if="isUserLoginPost" v-for="(menu, i) in DROPDOWN_MENU" :key="i">
                <NuxtLink :class="`w-full px-5 py-2 hover:bg-base-200 font-semibold flex gap-3 items-center cursor-pointer ${menu.classAdditional && [...menu.classAdditional]}`">
                  <i :class="menu.iconClass"></i>
                  {{ menu.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink :to="`/post/${post?.id}`">
          <h2 class="font-semibold font-poppins text-xl break-words hover:underline">{{ post?.title }}</h2>
        </NuxtLink>
      </header>
      <!-- //TODO Checking if Image or Videeo -->
      <div>
        <div class="w-full overflow-hidden relative">
          <NuxtImg :src="post?.url" :alt="post?.title" class="w-full rounded-md" loading="lazy" />
        </div>
      </div>
    </article>
    <div class="py-3 border-b border-b-base-200">
      <div class="flex items-center gap-1 flex-wrap">
        <div v-for="hashtag in post?.hashtags" :key="hashtag" class="rounded-full p-1">
          <NuxtLink :to="`/hashtag/${hashtag}`">
            <div class="badge badge-accent text-white gap-1 font-quicksand">
              <p>#{{ hashtag }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { post } = defineProps(["post"]);
const { $awn } = useNuxtApp();
const user = useSupabaseUser();

const userStore = useUserStore();

const userName = ref("");

//@ts-ignore
await userStore.getUserByEmail(user.value.email).then(() => {
  //@ts-ignore
  userName.value = userStore.user.name;
});

const isUserLoginPost = ref(post?.users?.name === userName.value);

const isShow = ref(false);

const dropdownRef = ref(null);
const linkPost = ref(`https://laughify.raihanmd.site/post/${post.id}`);

const closeDropdownOnOutsideClick = (event: any) => {
  //@ts-ignore
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

const copyToClipboard = () => {
  try {
    navigator.clipboard.writeText(linkPost.value);
    $awn.success("Copied to clipboard!");
  } catch (error) {
    console.log(error);
    $awn.alert("Error copying to clipboard");
  }
};

const DROPDOWN_MENU = [
  {
    label: "Edit",
    iconClass: "ri-edit-line",
    classAdditional: ["text-blue-500"],
  },
  {
    label: "Delete",
    iconClass: "ri-delete-bin-line",
    classAdditional: ["text-red-500"],
  },
];
</script>
