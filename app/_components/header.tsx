"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { FileCode2, Search } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import MobileNav from "./mobile-nav";
import SearchCommand from "./search-command";
import { usePathname } from "next/navigation";

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: {
      key: string;
      metaKey: any;
      ctrlKey: any;
      preventDefault: () => void;
    }) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header>
      <nav className="flex justify-between items-center p-2 sm:p-4 md:p-6">
        <Link className="flex items-center gap-1 sm:gap-2" href="/">
          <FileCode2 className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-base font-semibold">codeclip</span>
        </Link>
        <div className="hidden md:flex space-x-3 sm:space-x-6 items-center">
          <Link
            href="/feed"
            className={`text-sm sm:text-base ${
              pathname === "/feed" ? "font-bold text-primary" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/feed/explore"
            className={`text-sm sm:text-base ${
              pathname === "/feed/explore" ? "font-bold text-primary" : ""
            }`}
          >
            Explore
          </Link>
          <Link
            href="/feed/create"
            className={`text-sm sm:text-base ${
              pathname === "/feed/create" ? "font-bold text-primary" : ""
            }`}
          >
            Create
          </Link>
          <Button
            variant="outline"
            className="w-[150px] justify-between text-xs sm:text-sm"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            Search
            <kbd className="hidden sm:inline-flex pointer-events-none h-4 sm:h-5 select-none items-center gap-1 rounded border bg-muted px-1 sm:px-1.5 font-mono text-[8px] sm:text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-[8px] sm:text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
        <div className="md:hidden flex gap-1 sm:gap-2">
          <Button
            variant="outline"
            className="w-[90px] h-[30px] justify-between text-xs"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Search
          </Button>
        </div>
        <div className="md:hidden flex gap-1 sm:gap-2">
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-6 h-6 sm:w-9 sm:h-9 mt-0.5",
                  },
                }}
              />
            </SignedIn>
          </div>
          <MobileNav />
        </div>

        <div className="hidden md:flex space-x-2 sm:space-x-4">
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-7 h-7",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
      <SearchCommand open={open} setOpen={setOpen} />
    </header>
  );
}

export default Header;
