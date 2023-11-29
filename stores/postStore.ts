interface ICreatePost extends IUpdatePost {
  userId: string;
  url: string;
}

interface IUpdatePost {
  title: string;
  hashtags: string[];
}

interface IDeletePost {
  id: string;
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
    async updatePost(req: IUpdatePost) {
      try {
        const supabase = useSupabaseClient();

        //@ts-ignore
        const { error } = await supabase.from("posts").update({ title: req.title, hashtags: req.hashtags }).eq("id", req.id);

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "Edit post successfully";
      } catch (error) {
        this.status = false;
        //@ts-ignore
        this.message = error.message;
      }
    },
    async deletePost(req: IDeletePost) {
      try {
        const supabase = useSupabaseClient();

        //@ts-ignore

        const { error } = await supabase.from("posts").delete().eq("id", req.id);

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "Delete post successfully";
      } catch (error) {
        this.status = false;
        //@ts-ignore
        this.message = error.message;
      }
    },
  },
});
