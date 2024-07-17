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
import { FileCode2, PanelRightOpen } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center p-6">
        <div className="flex justify-start gap-2">
          <FileCode2 className="w-6 h-6" />
          <span>codeclip</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/explore">Explore</Link>
          <Link href="/dashboard/create">Create</Link>
        </div>

        <div className="md:hidden">
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
                <Link href="#">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </Link>
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
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
