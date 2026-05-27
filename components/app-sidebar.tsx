"use client";

import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Box,
  Code2,
  GalleryVerticalEnd,
  Gift,
  LayoutDashboard,
  Settings,
  Tag,
  Ticket,
  User,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      label: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      label: "User Management",
      url: "/user-management",
      icon: User,
    },
    {
      label: "Coupon",
      url: "/coupon",
      icon: Ticket,
    },
    {
      label: "Packages",
      url: "/packages",
      icon: Tag,
    },
    {
      label: "NAS Devices",
      url: "/nas-devices",
      icon: Box,
    },
  ],
  navUser: [
    {
      label: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      label: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  const router = useRouter();
  const { isMobile, toggleSidebar } = useSidebar();

  const closeSidebar = () => {
    isMobile && toggleSidebar();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent focus:outline-none focus:ring-0 active:bg-transparent"
              onClick={() => {
                router.push("/");
                closeSidebar();
              }}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Admin Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser items={data.navUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
