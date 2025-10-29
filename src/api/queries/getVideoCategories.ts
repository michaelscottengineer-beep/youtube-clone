import { axiosApi } from "@/lib/axiosInstance";
import type { TVideoCategory } from "@/types/videoCategory";

export default async function getVideoCategories(params?: any) {
  const url = "videoCategories";
  const res = await axiosApi.get(url, {
    params,
  });

  return res.data.items as TVideoCategory[];
}
