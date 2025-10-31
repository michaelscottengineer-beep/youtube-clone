import SearchBar from "./SearchBar";
import { AppDrawer } from "./AppDrawer";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Bell, LogOut, Plus, UserIcon } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import ChannelAvatar from "./ChannelAvatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaGoogle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between py-2 px-4 sticky top-0 bg-white backdrop-blur-2xl">
      <div className="flex items-center">
        <AppDrawer />
        <Link to={"/"}>
          <img src="/youtube-logo.png" alt="youtube logo" className="h-10" />
        </Link>
      </div>

      <SearchBar />

      <AuthPanel />
    </div>
  );
};

const AuthDropdown = () => {
  const { user, setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSingout = async () => {
    localStorage.removeItem("session");
    localStorage.removeItem("token");
    setAuthenticated?.(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer focus-visible:outline-none">
        <ChannelAvatar avatarUrl={user?.avatar} size={"sm"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4" align="start" sideOffset={-1}>
        <DropdownMenuItem>
          <ChannelAvatar avatarUrl={user?.avatar} />
          <div>
            <div>{user?.fullName}</div>
            <Button
              variant={"link"}
              className="p-0 text-blue-400 font-normal "
              onClick={() => navigate("/" + user?.id)}
            >
              Xem kênh của bạn
            </Button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaGoogle />
            Tài khoản Google
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSingout}>
            <LogOut />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const AuthPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="forUser masthead">
      {user ? (
        <div className="flex items-center gap-4">
          <Button variant={"secondary"} className="rounded-full">
            <Plus />
            Tạo
          </Button>

          <Button variant={"ghost"} className="rounded-full">
            <Bell />
          </Button>
          <AuthDropdown />
        </div>
      ) : (
        <Button
          className="rounded-full"
          variant={"outline"}
          onClick={() => navigate("/login")}
        >
          <UserIcon />
          Đăng nhập
        </Button>
      )}
    </div>
  );
};
export default Header;
