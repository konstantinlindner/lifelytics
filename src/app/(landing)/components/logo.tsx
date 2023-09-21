import { Activity } from "lucide-react";

import Link from "next/link";

interface LogoProps {
  hideText?: boolean;
}

function Logo({ hideText }: LogoProps) {
  return (
    <Link className="flex items-center" href={"/"}>
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
