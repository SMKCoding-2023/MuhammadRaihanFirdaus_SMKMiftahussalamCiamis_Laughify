export const useUserStore = defineStore("user", {
  state: () => ({
    status: false,
    message: "",
    user: {},
  }),
  actions: {
    async getUserByName(req: string) {
      try {
        const supabase = useSupabaseClient();

        const { data, error } = await supabase.from("users").select("image, name").eq("name", req);

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "OAuth Successfully !!!";
        this.user = data[0];
      } catch (error) {
        this.status = false;
        this.message = "OAuth Failed !!!";
      }
    },
    async getUserByEmail(req: string) {
      try {
        const supabase = useSupabaseClient();

        const { data, error } = await supabase.from("users").select("name").eq("email", req);

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "OAuth Successfully !!!";
        this.user = data[0];
      } catch (error) {
        this.status = false;
        this.message = "OAuth Failed !!!";
      }
    },
  },
});
