"use client";

import React from "react"; // นำเข้า React เพื่อใช้ Fragment แบบมี key
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs =
    segments.length > 0
      ? segments.map((segment) =>
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()),
        )
      : ["Dashboard"];

  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b z-30 px-4 bg-background">
      <SidebarTrigger className="-ml-1" />

      <Separator orientation="vertical" className="mr-2 my-5" />

      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb}>
              {/* ย้าย Separator มาไว้นอก BreadcrumbItem */}
              {index > 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem className="flex items-center gap-2">
                <BreadcrumbPage>{crumb}</BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <ModeToggle className="ml-auto" />
    </header>
  );
}
