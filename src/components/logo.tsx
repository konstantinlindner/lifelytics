import { Activity } from "lucide-react";

interface LogoProps {
  hideText?: boolean;
}

function Logo({ hideText }: LogoProps) {
  return (
    <div className="flex items-center">
      <Activity className="h-6 w-6" />

      {!hideText && (
        <div className="cursor-pointer select-none">
          <span className="text-lg font-bold ml-2">Life</span>
          <span className="text-lg">lytics</span>
        </div>
      )}
    </div>
  );
}

export default Logo;
