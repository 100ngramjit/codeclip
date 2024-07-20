"use client";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { FileCode2, PanelRightOpen, Search } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import debounce from "lodash/debounce";

function Header() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query) {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm: query }),
        });
        const data = await res.json();
        data.map((ele: any) => console.log(ele));
        setSearchResults(data || []);
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: any) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  return (
    <header>
      <nav className="flex justify-between items-center p-3 sm:p-6">
        <div className="flex justify-start gap-1 sm:gap-2">
          <FileCode2 className="w-4 h-4 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-base">codeclip</span>
        </div>
        <div className="hidden md:flex space-x-3 sm:space-x-6 items-center">
          <Link href="/dashboard" className="text-sm sm:text-base">
            Home
          </Link>
          <Link href="/dashboard/explore" className="text-sm sm:text-base">
            Explore
          </Link>
          <Link href="/dashboard/create" className="text-sm sm:text-base">
            Create
          </Link>
          <Button
            variant="outline"
            className="w-[150px] sm:w-[200px] justify-between text-xs sm:text-sm"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Search...
            <kbd className="hidden sm:inline-flex pointer-events-none h-4 sm:h-5 select-none items-center gap-1 rounded border bg-muted px-1 sm:px-1.5 font-mono text-[8px] sm:text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-[8px] sm:text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
        <div className="md:hidden flex gap-1 sm:gap-2">
          <Button
            variant="outline"
            className="w-[100px] sm:w-[150px] justify-between text-xs sm:text-sm"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Search...
          </Button>
        </div>
        <div className="md:hidden flex gap-1 sm:gap-2">
          <div>
            <SignedOut>
              <SignInButton>
                <Button size="sm" className="text-xs sm:text-sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-6 h-6 sm:w-9 sm:h-9",
                  },
                }}
              />
            </SignedIn>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-9 sm:w-9"
              >
                <PanelRightOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="grid gap-3 sm:gap-6 p-2">
                <SheetClose asChild>
                  <Link href="/dashboard" className="text-sm sm:text-base">
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/dashboard/explore"
                    className="text-sm sm:text-base"
                  >
                    Explore
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/dashboard/create"
                    className="text-sm sm:text-base"
                  >
                    Create
                  </Link>
                </SheetClose>
                <Button
                  variant="outline"
                  className="w-[150px] sm:w-[200px] justify-between text-xs sm:text-sm"
                  onClick={() => setOpen(true)}
                >
                  <Search className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Search...
                  <kbd className="pointer-events-none inline-flex h-4 sm:h-5 select-none items-center gap-1 rounded border bg-muted px-1 sm:px-1.5 font-mono text-[8px] sm:text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-[8px] sm:text-xs">⌘</span>K
                  </kbd>
                </Button>
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex space-x-2 sm:space-x-4">
          <ModeToggle />
          <SignedOut>
            <SignInButton>
              <Button size="sm" className="text-xs sm:text-sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-6 h-6 sm:w-7 sm:h-7",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchTerm}
          onChangeCapture={handleSearchChange}
        />
        <CommandList>
          {!searchResults.length ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <div>
              <h4 className="text-muted-foreground">Search Results</h4>
              {searchResults.map((result: any, index) => (
                <p key={index}>{result.fileName}</p>
              ))}
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
}

export default Header;
