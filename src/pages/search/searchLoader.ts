import searchVideos from "@/api/queries/searchVideos";
import type { TVideo } from "@/types/video";
import type { Params } from "react-router";

interface Args {
  params: Params;
  request: Request;
}

export interface SearchLoaderResponse {
  videos: TVideo[]
};

export default async function searchLoader({ request }: Args) {
  const { searchParams } = new URL(request.url);
  const search_query = searchParams.get("search_query");
  if (!search_query) throw new Error("please provide keyword");

  const data = await searchVideos(search_query);
  return data;
}
