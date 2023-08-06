"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const isDarkTheme = resolvedTheme === "dark";

  return (
    <Button
      className="h-9 w-9"
      onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
      variant="ghost"
      size="sm"
    >
      <Icon
        className="text-lg absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        icon="mdi:weather-sunny"
      />
      <Icon
        className="text-lg absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        icon="mdi:weather-night"
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
