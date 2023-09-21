"use client";

import { usePathname } from "next/navigation";
import { SidebarItems } from "./sidebar";

export default function PageHeader() {
  const pathname = usePathname();
  const currentPage = SidebarItems.find((item) => item.href === pathname);
  const pageHeader = currentPage ? currentPage.header : "";

  return <h2 className="text-2xl font-bold tracking-tight">{pageHeader}</h2>;
}
