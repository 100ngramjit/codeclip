import { Button } from "@/components/ui/button";
import { FileCode2, RocketIcon, Zap, Globe, Users } from "lucide-react";
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
        {/* --- Improved Hero Section --- */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[40rem] h-[40rem] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-30" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold">
                Create code &
                <FlipWords
                  words={[
                    "share with the world",
                    "download as an image",
                    "explore from the community",
                    "save anyone's clips",
                  ]}
                />
              </h1>
              <p className="text-muted-foreground text-md md:text-xl max-w-3xl mx-auto leading-relaxed">
                Join our community of developers to share, collaborate, and
                learn from each other's code snippets. Whether you're a beginner
                or an experienced coder, there's something for everyone.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <Link href="/dashboard">
                  <Button className="px-8 py-4 text-md font-semibold bg-gradient-to-r from-lime-600 to-green-900 hover:from-green-900 hover:to-lime-600 transform hover:scale-125 transition duration-150 ease-in-out shadow-lg">
                    {user ? "Go to dashboard" : "Get Started"}
                    <RocketIcon className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </section>
        {/* --- End Improved Hero Section --- */}

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to share code
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Powerful features designed for developers, by developers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Lightning Fast Card */}
              <div className="border border-slate-950 dark:border-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-16 h-16 text-slate-950 dark:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Share your code snippets instantly with syntax highlighting
                  and beautiful formatting.
                </p>
              </div>

              {/* Multi-Language Card */}
              <div className="border border-slate-950 dark:border-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-16 h-16 text-slate-950 dark:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Multi-Language</h3>
                <p className="text-muted-foreground">
                  Support for all programming languages with intelligent syntax
                  highlighting.
                </p>
              </div>

              {/* Community Driven Card */}
              <div className="border border-slate-950 dark:border-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-16 h-16 text-slate-950 dark:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Community Driven</h3>
                <p className="text-muted-foreground">
                  Discover, fork, and collaborate on code snippets with
                  developers worldwide.
                </p>
              </div>
            </div>
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
