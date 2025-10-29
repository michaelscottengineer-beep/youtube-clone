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

export default async function homeLoader(): Promise<HomeLoaderResponse> {
  const categories = await getVideoCategories();
  const { videos } = await getVideos(undefined, {
    chart: 'mostPopular' 
  });

  return {
    categories,
    videos,
  };
}
