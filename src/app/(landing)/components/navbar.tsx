import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="container flex flex-row items-center justify-between py-6 h-24`">
      <nav className="flex gap-10 items-center">
        <Logo />

        <div className="flex gap-6 items-center">
          <Link
            href="#"
            className="text-sm font-medium transition-colors
          text-foreground/60 hover:text-foreground/80"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors
          text-foreground/60 hover:text-foreground/80  "
          >
            Pricing
          </Link>
        </div>
      </nav>
      <div className="flex gap-2 items-center">
        <ModeToggle />

        <Link href={"/sign-in"}>
          <Button size="sm" variant="outline">
            Sign in
          </Button>
        </Link>

        <Link href={"/sign-up"}>
          <Button size="sm" variant="default">
            Sign up
          </Button>
        </Link>
      </div>
    </header>
  );
}
