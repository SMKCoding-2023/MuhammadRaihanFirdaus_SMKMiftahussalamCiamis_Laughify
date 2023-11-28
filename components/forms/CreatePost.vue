<script setup>
const user = useSupabaseUser();

const userStore = useUserStore();
const storageStore = useStorageStore();
const postStore = usePostStore();

const router = useRouter();

const titleInput = ref(null);
const imageInput = ref(null);
const tempHashtag = ref("");
const hashtags = ref([]);

const isSuccess = ref(false);
const isShowAlert = ref(false);
const isLoading = ref(false);
const imagePreview = ref(null);
const message = ref(null);

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

const createProduct = async () => {
  try {
    isLoading.value = true;

    const result = {};

    result.title = titleInput.value;
    result.hashtags = hashtags.value.map((tag) => tag);

    if (result.hashtags.length === 0) {
      throw new Error("Please insert at least one hashtag!");
    }

    const file = await uploadFile(imageInput);

    result.url = file;

    await userStore.getUserByEmail(user.value.email).then(() => {
      result.userId = userStore.user.id;
    });

    await postStore.createPost(result);

    if (!postStore.status) {
      const err = new Error(postStore.message);
      err.status = postStore.status;
      throw err;
    }

    isSuccess.value = postStore.status;
    message.value = postStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    hashtags.value = [];
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    router.push({ path: "/" });
  } catch (err) {
    isSuccess.value = err.status;
    message.value = err.message;
    isShowAlert.value = true;
    isLoading.value = false;
    hashtags.value = [];
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const uploadFile = async (formFile) => {
  const file = formFile?.value;
  const payload = new FormData();
  payload.append("file", file);
  const pathname = `${Date.now().toString()}.${file.type.split("/")[1]}`;
  await storageStore.uploadFile(pathname, payload);
  if (storageStore.status) {
    return storageStore.storage;
  }
};

const onFileChange = (e) => {
  const allowedExtensions = ["png", "jpg", "jpeg", "webp"];

  const file = e.target.files[0];

  if (file) {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      message.value = `File only accept PNG, JPG, JPEG, and WEBP`;
      isShowAlert.value = true;
      isLoading.value = false;
      return;
    }

    imageInput.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const deletePreview = () => {
  imagePreview.value = null;
};
</script>

<template>
  <section>
    <div class="flex flex-col gap-1 pb-4 mb-4 border-b border-b-base-200">
      <di class="flex items-center justify-center gap-2 font-semibold font-poppins flex-col">
        <div class="flex gap-3">
          <i class="ri-image-add-line text-lg"></i>
          <h1 class="text-center text-lg">Create Meme</h1>
        </div>
      </di>
    </div>
    <div v-if="isShowAlert" :class="`font-semibold font-poppins w-full p-4 mb-4 text-sm rounded-lg ${isSuccess ? 'bg-green-100 text-green-800' : 'text-red-800 bg-red-100'}`" role="alert">
      {{ message }}
    </div>
    <form @submit.prevent="createProduct">
      <div class="mb-6">
        <label for="image" class="block mb-2 text-lg text-gray-900 font-poppins font-semibold"> Image </label>
        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-base-200 relative">
          <div v-if="imagePreview">
            <div class="absolute top-10 right-6 cursor-pointer btn btn-circle bg-black/50 border-none text-white hover:bg-red-400" @click="deletePreview">
              <i class="ri-close-fill"></i>
            </div>
            <img v-if="imagePreview" :src="imagePreview" />
          </div>
          <div v-else>
            <label for="image" class="text-center">
              <svg class="mx-auto h-12 w-12 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="image" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-amber-700/80 focus-within:outline-none hover:text-amber-700">
                  <span>Upload a file</span>
                  <input name="image" class="sr-only" type="file" id="image" @change="onFileChange" required="true" />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, JPEG, WEBP up to 10MB</p>
            </label>
          </div>
        </div>
      </div>

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
        <span v-if="!isLoading">Submit</span>
        <div v-else class="flex items-center gap-3">
          <div class="w-5 h-5 rounded-full border-2 border-t-pink-200 animate-spin"></div>
          <span>Loading</span>
        </div>
      </button>
    </form>
  </section>
</template>
