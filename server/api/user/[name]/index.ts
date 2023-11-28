import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  //@ts-ignore
  const { name } = event.context.params;

  const supabase = await serverSupabaseClient(event);

  try {
    const { data: response, error } = await supabase
      .from("users")
      .select("id, image, name, posts(id, title, url, hashtags, createdAt, users (name, image))")
      .eq("name", name)
      .order("createdAt", { referencedTable: "posts", ascending: false });

    //@ts-ignore
    const data = response[0];

    if (error) {
      throw error;
    }

    return {
      status: 200,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal Server Error",
    };
  }
});
