"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export const SettingsTopbarItems = [
  { title: "Profile", href: "/dashboard/profile", header: "Profile settings" },
  {
    title: "Account",
    href: "/dashboard/account",
    header: "Account settings",
  },
];

export function SettingsTopbar() {
  const pathname = usePathname();

  return (
    <div className="max-w-max">
      <nav className="flex flex-row space-x-1 bg-muted p-1 rounded-lg">
        {SettingsTopbarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                pathname === item.href &&
                  "bg-white text-black hover:bg-white hover:text-black",
                "w-48"
              )}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
