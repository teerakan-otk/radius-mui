"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight, Minus, Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";

import type { LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  url: string;
  icon?: LucideIcon;
  items?: {
    label: string;
    url: string;
  }[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();
  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    if (isMobile) toggleSidebar();
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = !!item.items?.length;

          // child active
          const isChildActive = item.items?.some(
            (subItem) => pathname === subItem.url,
          );

          // main active เฉพาะ menu ที่ไม่มี child
          const isMainActive = !hasSubItems && pathname === item.url;

          return (
            <SidebarMenuItem key={item.url}>
              {hasSubItems ? (
                <Collapsible
                  open={open}
                  onOpenChange={setOpen}
                  className="group/collapsible"
                >
                  <>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton
                          tooltip={item.label}
                          isActive={false}
                        >
                          {item.icon && <item.icon />}

                          <span>{item.label}</span>

                          <ChevronRight
                            className={cn(
                              "ml-auto h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out",
                              open && "rotate-90",
                            )}
                          />
                        </SidebarMenuButton>
                      }
                    />

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.url}>
                            <SidebarMenuSubButton
                              onClick={() => {
                                router.push(subItem.url);
                                closeSidebar();
                              }}
                              isActive={pathname === subItem.url}
                              className="cursor-pointer"
                            >
                              <span>{subItem.label}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  onClick={() => {
                    router.push(item.url);
                    closeSidebar();
                  }}
                  isActive={isMainActive}
                  tooltip={item.label}
                >
                  {item.icon && <item.icon />}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
