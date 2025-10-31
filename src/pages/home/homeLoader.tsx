import getVideos from "@/api/queries/getVideo";
import getVideoCategories from "@/api/queries/getVideoCategories";
import searchVideos from "@/api/queries/searchVideos";
import type { TVideo } from "@/types/video";
import type { TVideoCategory } from "@/types/videoCategory";
import type { Params } from "react-router";

interface Args {
  params: Params;
  request: Request;
}

export interface HomeLoaderResponse {
  categories: TVideoCategory[];
  videos: TVideo[];
}

export default async function homeLoader({
  request,
}: Args): Promise<HomeLoaderResponse> {
  const { searchParams } = new URL(request.url);
const cateId = searchParams.get('cateId');

  const categories = await getVideoCategories();
  const { videos } = await getVideos(undefined, {
    chart: "mostPopular",
    videoCategoryId: cateId
  });

  console.log("szzzzzs", videos);
  return {
    categories,
    videos,
  };
}
