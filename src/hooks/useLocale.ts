import { useEffect } from "react";

export default function useLocale() {
  const data = {
    regionCode: "VN",
    locale: "vi",
    hl: "vi-VN",
  };

  useEffect(() => {
    localStorage.setItem("locale", JSON.stringify(data));
  }, [data]);

  return data;
}
