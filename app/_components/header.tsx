"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  useUser,
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FileCode2, PanelRightOpen } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
function Header() {
  //   const { user, isSignedIn } = useUser();
  return (
    <>
      <header>
        <nav className="flex justify-between items-center p-6">
          <div className="flex justify-start gap-2">
            <FileCode2 className="w-6 h-6" />
            <span>codeclip</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#">Home</Link>
            <Link href="#">Explore</Link>
            <Link href="#">Create</Link>
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
                </SheetHeader>
                <div className="grid gap-6 p-2">
                  <Link href="#">Home</Link>
                  <Link href="#">Explore</Link>
                  <Link href="#">Create</Link>
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
          {/* {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="hidden md:flex space-x-4">
              <Button>Login / Signup</Button>
            </div>
          )} */}
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
    </>
  );
}

export default Header;
