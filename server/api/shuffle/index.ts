import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  try {
    const { data, error } = await supabase.from("posts").select("id, title, url, hashtags, createdAt, users ( name, image )");

    if (error) {
      throw error;
    }

    const shuffledData = data.sort(() => Math.random() - 0.5).slice(0, 1);

    return {
      status: 200,
      data: shuffledData,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal Server Error",
    };
  }
});
