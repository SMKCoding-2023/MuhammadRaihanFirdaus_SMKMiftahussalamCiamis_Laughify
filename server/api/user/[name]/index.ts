import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  //@ts-ignore
  const { name } = event.context.params;

  const supabase = await serverSupabaseClient(event);

  try {
    const { data, error } = await supabase.from("users").select("id, image, name, posts(id, title, url, hashtags, createdAt)").eq("name", name);

    if (error) {
      console.error("Error fetching data:", error);
      return {
        status: 500,
        body: { error: "Internal Server Error" },
      };
    }

    return {
      status: 200,
      body: { data },
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
});
