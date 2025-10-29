import { axiosApi } from "@/lib/axiosInstance";

export default async function getAutoComplete(term: string, params?: any) {
  const url = "search";
  const searchParams = { ...params, part: "snippet", q: term, maxResults: 15 };
  const res = await axiosApi.get(url, {
    params: searchParams,
  });

  return res.data.items;
}
