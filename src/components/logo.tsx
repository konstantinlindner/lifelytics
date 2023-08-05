import Link from "next/link";
import { Icon } from "@iconify/react";

function Logo() {
  return (
    <div className="">
      <Flex as={Link} href={"/"} alignItems="center">
        <Icon
          icon="streamline:health-medical-heart-rate-health-beauty-information-data-beat-pulse-monitor-heart-rate-info"
          width="50"
        />

        <span className="text-lg" fontWeight="bold" ml="3">
          Life
        </span>
        <span fontSize="20">lytics</span>
      </Flex>
    </div>
  );
}

export default Logo;
