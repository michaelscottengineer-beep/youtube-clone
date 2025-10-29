import { ENV } from "@/config";
import type { TLocale } from "@/types/locale";
import axios, { type AxiosRequestConfig } from "axios";

console.log(ENV.YOUTUBE_BASE_URL);
const instance = axios.create({
  baseURL: ENV.YOUTUBE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLocale = () => {
  const locale = localStorage.getItem("locale");
  if (!locale) return {} as TLocale;
  const localeData = JSON.parse(locale) as TLocale;
  return localeData;
};

export const axiosApi = {
  get: async function (url: string, config: AxiosRequestConfig) {
    const locale = getLocale();

    config.params = {
      ...(config.params ?? {}),
      key: ENV.YOUTUBE_API_KEY,
      ...locale,
    };
    return await instance.get(url, config);
  },
};
