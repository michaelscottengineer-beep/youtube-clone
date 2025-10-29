import { useLocation } from "react-router";

export default function useIsHomePage() {
  const location = useLocation();
  const pathname = location.pathname;

  return pathname.length == 1 && pathname.startsWith('/')
}