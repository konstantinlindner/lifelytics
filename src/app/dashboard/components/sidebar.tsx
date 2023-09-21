"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "All transactions", href: "/dashboard/transactions" },
    { title: "Flights", href: "/dashboard/flights" },
    { title: "Accommodation", href: "/dashboard/accommodation" },
    { title: "Transportation", href: "/dashboard/transportations" },
    { title: "Food", href: "/dashboard/food" },
    { title: "Other", href: "/dashboard/other" },
    { title: "Subscriptions", href: "/dashboard/subscriptions" },
    { title: "Income", href: "/dashboard/income" },
  ];

  return (
    <nav className="flex flex-col w-60 h-screen border-r">
      <div className="h-24 flex items-center justify-center">
        <Logo isDashboard />
      </div>

      {sidebarItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className={
              pathname === item.href
                ? "bg-muted hover:bg-muted w-full justify-start"
                : "hover:bg-transparent hover:underline w-full justify-start"
            }
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}

// "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"
