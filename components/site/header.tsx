import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/content/site";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link
          href="/"
          className="flex items-center"
          aria-label="TBM Carriers — home"
        >
          <Image
            src="/brand/TBM-Carriers-Logo.jpg"
            alt="TBM Carriers"
            width={120}
            height={48}
            className="h-10 w-auto md:h-12"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden md:flex md:items-center md:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/get-a-quote"
          className={cn(
            buttonVariants({ variant: "default" }),
            "hidden h-10 rounded-full px-6 hover:bg-primary/80 md:inline-flex"
          )}
        >
          Get a Quote
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
