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

const instanceNodeServer = axios.create({
  baseURL: ENV.NODE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instanceNodeServer.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;

  return config;
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

export const nodeServerApi = {
  post: async function (url: string, config?: AxiosRequestConfig) {
    const res = await instanceNodeServer.post(url, config);
    if (res.statusText === "OK") return res.data;
    return res;
  },
};

export const nodeServerAuthApi = {
  post: async function <T>(url: string, config?: AxiosRequestConfig) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.history.pushState({}, "", "/login");
      return null;
    }

    const res = await instanceNodeServer.post(url, {
      ...config,
    });

    if (res.statusText === "OK") return res.data as T;

    throw new Error("auth : post failed ");
  },
  get: async function <T>(url: string, config?: AxiosRequestConfig) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.history.pushState({}, "", "/login");
      return null;
    }

    const res = await instanceNodeServer.get(url, {
      ...config,
    });

    if (res.statusText === "OK") return res.data.data as T;

    throw new Error("auth : post failed ");
  },
};
