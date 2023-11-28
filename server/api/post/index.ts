import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  try {
    const { data, error } = await supabase.from("posts").select("id, title, url, hashtags, createdAt, users ( name, image )").order("createdAt", { ascending: false });

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
