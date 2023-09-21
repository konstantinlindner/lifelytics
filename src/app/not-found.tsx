import Navbar from "@/app/(landing)/components/navbar";

import { ServerCrash } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <Navbar />

      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <ServerCrash className="h-16 w-16" />
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Not found - 404
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Sorry, this page does not exist.
          </p>
          <Link href={"/"}>
            <Button size="lg" className="mt-6">
              Go back home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
