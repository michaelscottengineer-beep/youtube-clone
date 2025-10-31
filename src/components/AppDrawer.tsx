"use client";

import * as React from "react";
import { BookMarkedIcon, Home, Menu, Save } from "lucide-react";
import { FaBookmark } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

type TDrawerTab = {
  icon: any;
  label: string;
  type: string;
  goTo: string;
  addonIcon: React.ReactElement | null;
};

const data: TDrawerTab[] = [
  {
    icon: Home,
    label: "Trang chủ",
    type: "category",
    goTo: "/",
    addonIcon: null,
  },
  {
    icon: SiYoutubeshorts,
    label: "Shorts",
    type: "category",
    goTo: "/shorts",
    addonIcon: null,
  },
    {
    icon: FaBookmark,
    label: "Video đã lưu",
    type: "",
    goTo: "/saved",
    addonIcon: null,
  },
];

export function AppDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button size={"icon-sm"} variant={"ghost"}>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" max-w-[300px] !w-[200px] ">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center flex-col justify-center space-y-2">
              {data.map((tab) => (
                <DrawerTab key={tab.label} tab={tab} />
              ))}
            </div>
            <div className="mt-3 h-[120px]"></div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface DrawerTabProps {
  tab: TDrawerTab;
}
const DrawerTab = ({ tab }: DrawerTabProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive =
    (tab.goTo === "/" ? pathname.length === 1 : true) &&
    pathname.includes(tab.goTo);
  const icon = tab.icon ? (
    <div>
      <tab.icon />
    </div>
  ) : (
    ""
  );
  const CompPanel = tab.goTo ? (
    <Link to={tab.goTo} className="block w-full">
      <Button
        className={cn(
          "bg-transparent text-black hover:bg-gray-200 w-full flex items-center gap-4 justify-start",
          {
            "bg-gray-200 text-black  ": isActive,
          }
        )}
      >
        {icon}
        <div
          className={cn("font-normal", {
            "font-medium": tab.type === "category",
          })}
        >
          {tab.label}
        </div>
        {tab.addonIcon != null && <div>{tab.addonIcon}</div>}
      </Button>
    </Link>
  ) : (
    <div>{tab.label}</div>
  );

  return <div className="tab w-full">{CompPanel}</div>;
};
