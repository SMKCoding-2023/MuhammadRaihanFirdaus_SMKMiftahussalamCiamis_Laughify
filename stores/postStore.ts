interface ICreatePost {
  userId: string;
  title: string;
  url: string;
  hashtags: string[];
}

export const usePostStore = defineStore("post", {
  state: () => ({
    post: {} as any,
    status: false,
    message: "",
  }),
  actions: {
    async createPost(req: ICreatePost) {
      try {
        const supabase = useSupabaseClient();

        //@ts-ignore
        const { error } = await supabase
          .from("posts")
          .insert([{ id: getNanoid(20), userId: req.userId, title: req.title, url: req.url, hashtags: req.hashtags }])
          .select();

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "Upload post successfully";
      } catch (error) {
        this.status = false;
        //@ts-ignore
        this.message = error.message;
      }
    },
  },
});
