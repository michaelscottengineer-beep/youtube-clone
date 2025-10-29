import SearchBar from "./SearchBar";
import { AppDrawer } from "./AppDrawer";

const Header = () => {
  return (
    <div className="flex justify-between py-2 px-4">
      <div className="flex items-center">
        <AppDrawer />
        <img src="/youtube-logo.png" alt="youtube logo" className="h-10" />
      </div>

      <SearchBar />

      <div className="forUser w-20">as</div>
    </div>
  );
};

export default Header;
