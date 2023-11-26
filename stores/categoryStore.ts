import PREFIX from "~/constant/PREFIX";

interface ICreateCategory {
  name: string;
}

export const useCategoryStore = defineStore("category", {
  state: () => ({
    category: {} as any,
    status: false,
    message: "",
  }),
  actions: {
    async createCategory(req: ICreateCategory) {
      try {
        const supabase = useSupabaseClient();
        //@ts-ignore
        const { data, error } = await supabase
          .from("categories")
          .insert([{ id: PREFIX.CATEGORY + getNanoid(), name: req.name }])
          .select();

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "Create category successfully";
        this.category = data;
      } catch (error) {
        this.status = false;
        //@ts-ignore
        this.message = error.message;
      }
    },
    async getCategories() {
      try {
        const supabase = useSupabaseClient();

        const { data, error } = await supabase.from("categories").select("*");

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "Get categories successfully";
        this.category = data;
      } catch (error) {
        this.status = false;
        //@ts-ignore
        this.message = error.message;
      }
    },
  },
});
