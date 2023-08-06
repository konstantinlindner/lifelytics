"use client";

import { Icon } from "@iconify/react";

interface LogoProps {
  hideText?: boolean;
}

function Logo({ hideText }: LogoProps) {
  return (
    <div className="flex items-center">
      <Icon
        icon="streamline:health-medical-heart-rate-health-beauty-information-data-beat-pulse-monitor-heart-rate-info"
        width="30"
      />

      {!hideText && (
        <>
          <span className="text-lg font-bold ml-2">Life</span>
          <span className="text-lg">lytics</span>
        </>
      )}
    </div>
  );
}

export default Logo;
