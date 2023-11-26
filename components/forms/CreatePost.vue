<script setup>
const user = useSupabaseUser();

const categoryStore = useCategoryStore();
const userStore = useUserStore();
const storageStore = useStorageStore();
const postStore = usePostStore();

const isSuccess = ref(false);
const isShowAlert = ref(false);
const message = ref("Error");
const isLoading = ref(false);
const categories = ref([]);
const imagePreview = ref(null);

const router = useRouter();

const formUploadPost = [
  { name: "image", label: "Image", type: "file", value: {}, placeholder: "", required: true },
  { name: "title", label: "Title", type: "text", value: "", placeholder: "Some epic title", required: true },
  { name: "categoryId", label: "Category", type: "select", value: "", placeholder: "", required: true },
];

categoryStore.getCategories().then(() => {
  categories.value = categoryStore.category;
});

const createProduct = async () => {
  isLoading.value = true;

  let file = formUploadPost.find((item) => item.type === "file");

  file = await uploadFile(file?.value);

  const result = {};

  formUploadPost.forEach((item) => {
    if (item.name) {
      result[item.name] = item.value;
    }
  });

  result.url = file;

  await userStore.getUserByEmail(user.value.email).then(() => {
    result.userId = userStore.user.id;
  });

  await postStore.createPost(result);
  if (!postStore.status) {
    isSuccess.value = postStore.status;
    message.value = postStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    isSuccess.value = postStore.status;
    message.value = postStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    router.push({ path: "/" });
  }
};

const uploadFile = async (formFile) => {
  const file = formFile?.target?.files[0];
  const payload = new FormData();
  payload.append("file", file);
  const pathname = `${Date.now().toString()}.${file.type.split("/")[1]}`;
  await storageStore.uploadFile(pathname, payload);
  if (storageStore.status) {
    return storageStore.storage;
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  imagePreview.value = URL.createObjectURL(file);
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
        <div v-if="isShowAlert" :class="`w-full p-4 mb-4 text-sm rounded-lg ${isSuccess ? 'bg-green-100 text-green-800' : 'text-red-800 bg-red-100'}`" role="alert">
          {{ message }}
        </div>
      </di>
    </div>
    <form @submit.prevent="createProduct">
      <div class="mb-6" v-for="(item, index) in formUploadPost" :key="index">
        <label :for="item.name" class="block mb-2 text-lg text-gray-900 font-poppins font-semibold">
          {{ item.label }}
        </label>
        <select v-if="item.type === 'select'" :id="item.name" class="bg-base-200 border border-base-300 text-gray-900 text-sm rounded-lg focus:ring-base-300 focus:border-base-300 block w-full p-2.5" v-model="item.value">
          <option disabled value="">Choose Category</option>
          <option v-for="(category, index) in categories" :key="index" :value="category?.id">{{ category?.name }}</option>
        </select>
        <div v-else-if="item.type === 'file'" class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-base-200 relative">
          <div v-if="imagePreview">
            <div class="absolute top-10 right-6 cursor-pointer btn btn-circle bg-black/50 border-none text-white hover:bg-red-400" @click="deletePreview">
              <i class="ri-close-fill"></i>
            </div>
            <img v-if="imagePreview" :src="imagePreview" />
          </div>
          <div v-else>
            <label for="file-upload" class="text-center">
              <svg class="mx-auto h-12 w-12 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-amber-700/80 focus-within:outline-none hover:text-amber-700">
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    class="sr-only"
                    :type="item.type"
                    :id="item.name"
                    @change="onFileChange"
                    :required="item.required"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
            </label>
          </div>
        </div>
        <input
          v-else
          :type="item.type"
          :id="item.name"
          v-model="item.value"
          class="bg-base-200 border border-base-300 text-gray-900 text-sm rounded-lg focus:ring-base-300 focus:border-base-300 block w-full p-2.5 placeholder-gray-700"
          :placeholder="item.placeholder"
          :required="item.required"
        />
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
