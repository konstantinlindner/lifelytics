import { Activity } from 'lucide-react';

import Link from 'next/link';

interface LogoProps {
  hideText?: boolean;
  isDashboard?: boolean;
}

export default function Logo({ hideText, isDashboard }: LogoProps) {
  return (
    <Link
      className="flex items-center"
      href={!isDashboard ? '/' : '/dashboard'}
    >
      <Activity className="h-7 w-7" />

      {!hideText && (
        <div className="select-none">
          <span className="text-xl font-bold ml-2">Life</span>
          <span className="text-xl">lytics</span>
        </div>
      )}
    </Link>
  );
}
