"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="App">
      <header className="border-b">
        <nav className="flex justify-between items-center p-6">
          <div className="logo">CodeClip</div>
          <div className="hidden md:flex space-x-6">
            <Link href="#home">Home</Link>
            <Link href="#explore">Explore</Link>
            <Link href="#create">Create</Link>
            <Link href="#login">Login</Link>
            <Link href="#signup">Sign Up</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button className="bg-red-500 text-white px-4 py-2 rounded">
              Action 1
            </Button>
            <Button className="border border-red-500 text-red-500 px-4 py-2 rounded">
              Action 2
            </Button>
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
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 p-4">
                  <Link href="#home">Home</Link>
                  <Link href="#explore">Explore</Link>
                  <Link href="#create">Create</Link>
                  <Link href="#login">Login</Link>
                  <Link href="#signup">Sign Up</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
      <main className="text-center p-10">
        <section className="hero space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Share and Collaborate on Code
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Join our community of developers to share, collaborate, and learn
            from each other's code snippets. Whether you're a beginner or an
            experienced coder, there's something for everyone.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-red-500 text-white px-6 py-3 rounded">
              Get Started
            </button>
            <button className="border border-red-500 text-red-500 px-6 py-3 rounded">
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
