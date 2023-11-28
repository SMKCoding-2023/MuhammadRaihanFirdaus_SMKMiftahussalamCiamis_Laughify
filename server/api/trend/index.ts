import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  try {
    const { data, error } = await supabase.from("posts").select("hashtags").order("hashtags", { ascending: false });

    if (error) {
      throw error;
    }

    const hashtags = data.map((post) => post.hashtags).flat();

    function sortByModus(array: Array<string>) {
      const frequencyMap = array.reduce((map, value) => {
        //@ts-ignore
        map[value] = (map[value] || 0) + 1;
        return map;
      }, {});

      //@ts-ignore
      const sortedArray = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);

      return sortedArray.slice(0, 10);
    }

    const topHashtags = sortByModus(hashtags);

    return {
      status: 200,
      data: topHashtags,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal Server Error",
    };
  }
});
