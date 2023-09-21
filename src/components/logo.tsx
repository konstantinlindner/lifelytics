import { Activity } from "lucide-react";

import Link from "next/link";

interface LogoProps {
  hideText?: boolean;
  isDashboard?: boolean;
}

function Logo({ hideText, isDashboard }: LogoProps) {
  return (
    <Link
      className="flex items-center"
      href={!isDashboard ? "/" : "/dashboard"}
    >
      <Activity className="h-6 w-6" />

      {!hideText && (
        <div className="select-none">
          <span className="text-lg font-bold ml-2">Life</span>
          <span className="text-lg">lytics</span>
        </div>
      )}
    </Link>
  );
}

export default Logo;
