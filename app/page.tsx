import { CarouselPlugin } from "@/components/card-carousal";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import Header from "./_components/header";
import FooterLanding from "./_components/footer-landing";
import { FlipWords } from "./_components/flip-words";

export default function Home() {
  return (
    <div>
      <Header />
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
          <div className="flex justify-center align-center">
            <CarouselPlugin />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Button>
              Get Started <ChevronsRight />
            </Button>
          </div>
        </section>
      </main>
      <FooterLanding />
    </div>
  );
}
