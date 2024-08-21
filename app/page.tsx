import { Button } from "@/components/ui/button";
import { FileCode2, RocketIcon } from "lucide-react";
import FooterLanding from "./_components/footer-landing";
import { FlipWords } from "./_components/flip-words";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import CarousalLanding from "./_components/carousal-landing";

export default async function Home() {
  const user = await currentUser();

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
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Create code clips &
            <FlipWords
              words={[
                "steal and save anyone's clips",
                "share clips with the world",
                "download any clip as an image",
                "explore clips from the whole community",
              ]}
            />
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Join our community of developers to share, collaborate, and learn
            from each other's code snippets. Whether you're a beginner or an
            experienced coder, there's something for everyone.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/dashboard">
              <Button size="sm">
                {user ? "Go to dashboard" : "Get Started"}
                <RocketIcon className="pl-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <div className="w-full max-w-4xl mx-auto">
        <CarousalLanding />
      </div>
      <FooterLanding />
    </div>
  );
}
