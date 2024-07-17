import { CarouselPlugin } from "@/components/card-carousal";
import { Button } from "@/components/ui/button";
import { ChevronsRight, FileCode2, PanelRightOpen, Sheet } from "lucide-react";
import FooterLanding from "./_components/footer-landing";
import { FlipWords } from "./_components/flip-words";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./_components/theme-toggle";

export default async function Home() {
  const user = await currentUser();
  console.log("user", user);
  return (
    <div>
      <header>
        <nav className="flex justify-between items-center p-6">
          <div className="flex justify-start gap-2">
            <FileCode2 className="w-10 h-10" />
            <span className="text-3xl">codeclip</span>
          </div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
      <main className="text-center p-10">
        <section className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Create and
            <FlipWords words={["Save Code", "Copy Code", "Share Code"]} />
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Join our community of developers to share, collaborate, and learn
            from each other's code snippets. Whether you're a beginner or an
            experienced coder, there's something for everyone.
          </p>
          {/* <div className="flex justify-center align-center">
            <CarouselPlugin />
          </div> */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/dashboard">
              <Button>
                Get Started <ChevronsRight />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <FooterLanding />
    </div>
  );
}
