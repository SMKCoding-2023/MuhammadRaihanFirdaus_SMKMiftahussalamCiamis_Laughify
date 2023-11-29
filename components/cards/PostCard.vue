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
              <div v-if="isUserLoginPost" @click="toggleDialog('edit')" class="h-full w-full px-5 py-2 hover:bg-base-200 font-semibold flex gap-3 items-center cursor-pointer text-blue-500">
                <i class="ri-edit-line"></i>
                Edit
              </div>
              <div v-if="isUserLoginPost" @click="toggleDialog('delete')" class="h-full w-full px-5 py-2 hover:bg-base-200 font-semibold flex gap-3 items-center cursor-pointer text-red-500">
                <i class="ri-delete-bin-line"></i>
                Delete
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
  <Dialog v-model:visible="dialog.visible" modal header="Header" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="bg-base-100">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <p v-if="dialog.type === 'edit'">Edit post</p>
        <p v-else>Confirmation Delete post</p>
      </div>
    </template>
    <form @submit.prevent="editPost" v-if="dialog.type === 'edit'">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-lg text-gray-900 font-poppins font-semibold"> Title </label>

        <div>
          <input
            type="text"
            id="title"
            v-model="titleInput"
            class="input-md border-dashed bg-base-200 border border-gray-900/25 text-gray-900 text-sm rounded-lg focus:ring-base-300 focus:border-base-300 block w-full p-2.5 placeholder-amber-700/50"
            placeholder="Some epic title..."
            required="true"
          />
        </div>
      </div>

      <div class="mb-6">
        <label for="hashtag" class="block mb-2 text-lg text-gray-900 font-poppins font-semibold"> Hashtag </label>

        <div class="join flex">
          <input
            @keydown="validateInputHashtag"
            @keyup="addHashtag"
            type="text"
            id="hashtag"
            v-model="tempHashtag"
            class="flex-1 join-item input-md mb-3 bg-base-200 border border-dashed border-gray-900/25 text-gray-900 text-sm rounded-lg focus:ring-base-300 focus:border-base-300 block w-full p-2.5 placeholder-amber-700/50"
            placeholder="More hashtag be better..."
          />
          <button type="button" @click="addHashtagWithButton" class="btn join-item btn-md border border-dashed border-gray-900/25 hover:bg-red-400/70 hover:text-white">
            <i class="ri-add-line"></i>
          </button>
        </div>
        <p class="text-gray-700 hidden md:block">Note : If you're using desktop, use <kbd class="kbd kbd-sm">space</kbd> or <kbd class="kbd kbd-sm">,</kbd> as separator.</p>
      </div>

      <div class="mb-6" v-show="hashtags.length > 0">
        <div class="flex items-center gap-2 flex-wrap">
          <div v-for="(hashtag, index) in hashtags" :key="index" class="rounded-full p-1">
            <div @click="removeHashtag(hashtag)" class="cursor-pointer badge badge-accent text-white gap-1 font-quicksand">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <p>#{{ hashtag }}</p>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="text-white bg-primary btn hover:bg-red-400/70 focus:ring-4 focus:outline-none focus:ring-base-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
        <span>Edit</span>
      </button>
    </form>

    <div v-else>
      <h2 class="mb-6">
        Are you sure want to delete that post with title <span class="font-semibold">{{ post.title }}</span
        >?
      </h2>
      <button @click="deletePost" class="text-white btn hover:bg-red-400/70 focus:ring-4 focus:outline-none focus:ring-base-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-400">
        <i class="ri-delete-bin-line"></i>

        <span>Yes, im sure</span>
      </button>
    </div>
  </Dialog>
</template>

<script setup>
const { post } = defineProps(["post"]);
const { $awn } = useNuxtApp();
const user = useSupabaseUser();

const router = useRouter();

const userStore = useUserStore();
const postStore = usePostStore();

const userName = ref("");
const userId = ref("");
const dialog = reactive({ visible: false, type: null });
const titleInput = ref(post.title);
const tempHashtag = ref("");
const hashtags = ref(post.hashtags.map((item) => item));

watch(dialog, () => {
  if (!dialog.value) {
    titleInput.value = post.title;
    tempHashtag.value = "";
    hashtags.value = post.hashtags.map((item) => item);
  }
});

const toggleDialog = (type) => {
  dialog.visible = !dialog.visible;
  dialog.type = type;
};

if (user.value) {
  await userStore.getUserByEmail(user.value.email).then(() => {
    userName.value = userStore.user.name;
    userId.value = userStore.user.id;
  });
}

const isUserLoginPost = ref(post?.users?.name === userName.value);

const isShow = ref(false);

const dropdownRef = ref(null);
const linkPost = ref(`https://laughify.raihanmd.site/post/${post.id}`);

const closeDropdownOnOutsideClick = (event) => {
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

const editPost = async () => {
  try {
    const result = {};

    result.title = titleInput.value;
    result.hashtags = hashtags.value.map((tag) => tag);
    result.id = post.id;

    if (result.hashtags.length === 0) {
      $awn.warning("Please insert at least one hashtag!");
    }

    await postStore.updatePost(result);

    if (!postStore.status) {
      const err = new Error(postStore.message);
      err.status = postStore.status;
      throw err;
    }

    hashtags.value = [];
    titleInput.value = [];
    dialog.visible = false;
    dialog.type = null;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    $awn.success(postStore.message);
    router.push({ path: `/post/${post.id}`, force: true });
  } catch (error) {
    dialog.visible = false;
    dialog.type = null;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    $awn.alert(error.message);
  }
};

const deletePost = async () => {
  try {
    const result = {};

    result.id = post.id;

    await postStore.deletePost(result);

    if (!postStore.status) {
      const err = new Error(postStore.message);
      err.status = postStore.status;
      throw err;
    }

    dialog.visible = false;
    dialog.type = null;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    $awn.success(postStore.message);
    router.push({ path: `/user/${userName.value}`, force: true });
  } catch (error) {
    dialog.visible = false;
    dialog.type = null;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    $awn.alert(error.message);
  }
};

const validateInputHashtag = (e) => {
  if (!(e.key === "," || (e.key >= "a" && e.key <= "z") || (e.key === " " && tempHashtag.value.trim() !== "") || e.key === "Backspace")) {
    e.preventDefault();
  }
};

const addHashtag = (e) => {
  if (e.key === "," || (e.key === " " && tempHashtag.value.trim() !== "")) {
    const filteredInput = tempHashtag.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!hashtags.value.includes(filteredInput)) {
      if (filteredInput !== "") {
        hashtags.value.push(filteredInput);
      }
    }
    tempHashtag.value = "";
  }
};

const addHashtagWithButton = (e) => {
  const filteredInput = tempHashtag.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (!hashtags.value.includes(filteredInput)) {
    if (filteredInput !== "") {
      hashtags.value.push(filteredInput);
    }
  }
  tempHashtag.value = "";
};

const removeHashtag = (hashtag) => {
  hashtags.value = hashtags.value.filter((cur) => cur !== hashtag);
};
</script>
