import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  try {
    const { data, error } = await supabase.from("posts").select("id, title, url, hashtags, createdAt, users ( name, image )").order("createdAt", { ascending: false });

    if (error) {
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
