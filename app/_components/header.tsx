"use client";
import React from "react";
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
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

function Header() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
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
      <nav className="flex justify-between items-center p-6">
        <div className="flex justify-start gap-2">
          <FileCode2 className="w-6 h-6" />
          <span>codeclip</span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/explore">Explore</Link>
          <Link href="/dashboard/create">Create</Link>
          <Button
            variant="outline"
            className="w-[200px] justify-between"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <div className="md:hidden flex gap-2">
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9",
                  },
                }}
              />
            </SignedIn>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <PanelRightOpen className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 p-2">
                <SheetClose asChild>
                  <Link href="/dashboard">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/explore">Explore</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/create">Create</Link>
                </SheetClose>
                <Button
                  variant="outline"
                  className="w-[200px] justify-between"
                  onClick={() => setOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search...
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex space-x-4">
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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>Search</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}

export default Header;
