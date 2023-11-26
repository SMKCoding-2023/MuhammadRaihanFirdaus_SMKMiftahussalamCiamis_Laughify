export const useStorageStore = defineStore("storage", {
  state: () => ({
    storage: {} as any,
    status: false,
    message: "",
  }),
  actions: {
    async uploadFile(pathname: string, file: any) {
      try {
        const supabase = useSupabaseClient();
        const { error } = await supabase.storage.from("posts").upload(pathname, file);

        const { data } = supabase.storage.from("posts").getPublicUrl(pathname);

        if (error) {
          throw error;
        }
        this.status = true;
        this.message = "Upload successfully";
        this.storage = data.publicUrl;
      } catch (error) {
        this.status = false;
        //@ts-ignore
        this.message = error.message;
      }
    },
  },
});
