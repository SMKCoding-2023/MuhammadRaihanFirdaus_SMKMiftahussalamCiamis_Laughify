import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data } = await supabase.from("posts").select("id, title, url, hastags, createdAt, users ( name, image )").order("createdAt", { ascending: false });

  return { data };
});
