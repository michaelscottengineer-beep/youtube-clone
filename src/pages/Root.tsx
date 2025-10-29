import Header from "@/components/Header";
import { Outlet } from "react-router";
import useLocale from "@/hooks/useLocale";
const Root = () => {
  useLocale();

  return (
    <div>
      <Header />
      <div>
     
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
