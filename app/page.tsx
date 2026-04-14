import { Button } from "@/components/ui/button";
import {
  FileCode2,
  Zap,
  Globe,
  Users,
  Brain,
  Sparkles,
  FileText,
  Search,
  Code,
  Check,
  Shield,
  Clock,
  Target,
} from "lucide-react";
import FooterLanding from "./_components/footer-landing";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import CarousalLanding from "./_components/carousal-landing";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { TextAnimate } from "@/components/ui/text-animate";

export default async function Home() {
  const user = await currentUser();

  const aiReviewCode = `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// ✨ AI Suggestions:
// ✅ Consider using reduce() for better readability
// ⚠️  Add input validation for items parameter  
// 🔒 Validate price values to prevent injection
// 📚 Add JSDoc comments for documentation
// ⚡ Use const instead of let for immutable total

// 🚀 Optimized version:
const calculateTotal = (items = []) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
`;

  const heroCode = `import { reviewCode } from "@codeclip/ai";

const clip = await reviewCode({
  language: "typescript",
  code: mySnippet,
});

console.log(clip.suggestions);
// → [{ type: "security", severity: "high" },
//    { type: "perf",     severity: "medium" },
//    { type: "style",    severity: "low"  }]

clip.docs;  // Auto-generated JSDoc
clip.score; // 94 / 100`;

  return (
    <div
      className="dark relative min-h-screen overflow-x-hidden"
      style={{ background: "#0d0d0f" }}
    >
      {/* Universal Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 80% 55% at 50% -5%, hsla(247, 43%, 72%, 0.35) 0%, transparent 70%)",
            "radial-gradient(ellipse 55% 45% at 85% 85%, hsla(247, 40%, 40%, 0.25) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 40% at 10% 70%, hsla(247, 43%, 72%, 0.18) 0%, transparent 60%)",
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 52px 52px, 52px 52px",
        }}
      />
      <main className="relative z-10">
        {/* ─────────────────────────── HERO ─────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* ── Glassmorphic floating navbar ── */}
          <header className="absolute top-0 left-0 right-0 z-50 px-4 pt-5">
            <nav
              className="flex justify-between items-center max-w-4xl mx-auto px-5 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "hsl(247, 43%, 72%)",
                    boxShadow: "0 0 14px hsla(247, 43%, 72%, 0.55)",
                  }}
                >
                  <FileCode2 className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-black text-white tracking-tighter">
                  codeclip
                </span>
              </div>

              {/* Auth */}
              <div className="flex items-center gap-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      size="sm"
                      className="font-bold rounded-xl px-5 border-0"
                      style={{
                        background: "hsl(247, 43%, 72%)",
                        color: "#000",
                        boxShadow: "0 0 18px hsla(247, 43%, 72%, 0.45)",
                      }}
                    >
                      Get started
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="font-bold rounded-xl px-5 border-0"
                      style={{
                        background: "hsl(247, 43%, 72%)",
                        color: "#000",
                        boxShadow: "0 0 18px hsla(247, 43%, 72%, 0.45)",
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </nav>
          </header>

          {/* ── Main hero content — split layout ── */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center text-center lg:text-left">
            {/* Left — copy */}
            <div className="flex flex-col items-center lg:items-start gap-7">
              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl xl:text-[4.5rem] font-black text-white leading-[1.08] tracking-tight">
                Code Sharing,{" "}
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  as="span"
                  startOnView={false}
                  segmentStyle={
                    {
                      backgroundImage:
                        "linear-gradient(135deg, hsl(247, 45%, 80%) 0%, hsl(286, 45%, 60%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      paddingBottom: "0.2em",
                      marginBottom: "-0.2em",
                    } as React.CSSProperties
                  }
                >
                  Reimagined for the AI Era
                </TextAnimate>
              </h1>

              {/* Sub-copy */}
              <p
                className="text-lg leading-relaxed max-w-[440px] mx-auto lg:mx-0"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                The world&apos;s most advanced code-sharing platform. Paste a
                snippet, get an instant AI review, auto-generated docs, and
                share with developers everywhere — in seconds.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    className="w-full h-[60px] px-10 font-bold rounded-2xl border-0 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "hsl(247, 43%, 72%)",
                      color: "#000",
                      fontSize: "1.05rem",
                      boxShadow: "0 0 28px hsla(247, 43%, 72%, 0.42)",
                    }}
                  >
                    {user ? "Open Dashboard" : "Start for free"}
                  </Button>
                </Link>
                <a href="#features" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full h-[60px] px-10 font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: "1.05rem",
                    }}
                  >
                    See how it works
                  </Button>
                </a>
              </div>
            </div>

            {/* Right — floating code card */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Glow blob */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-[100px] opacity-25"
                style={{
                  width: 440,
                  height: 440,
                  background:
                    "radial-gradient(circle, oklch(0.7166 0.1561 247.1092) 0%, oklch(0.3974 0.0871 247.23) 55%, transparent 80%)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* The card */}
              <div
                className="relative w-full max-w-[500px] rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(10, 10, 12, 0.8)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
                }}
              >
                {/* Mac chrome bar */}
                <div className="flex items-center px-4 py-3 gap-2 border-b rounded-t-2xl">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-xs font-mono text-white/40">
                    ai-review.ts
                  </span>
                </div>

                {/* Code */}
                <div className="px-5 pb-5 pt-2">
                  <SyntaxHighlighter
                    style={irBlack}
                    wrapLines
                    customStyle={{
                      fontFamily: "var(--font-sans), monospace",
                      fontSize: "0.85rem",
                      background: "transparent",
                      padding: "0",
                      margin: "0",
                      lineHeight: "1.6",
                    }}
                    codeTagProps={{
                      style: { fontFamily: "var(--font-sans), monospace" },
                    }}
                  >
                    {heroCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ─────────────────────── END HERO ─────────────────────────── */}

        {/* --- AI-Enhanced Feature Section --- */}
        <section id="features" className="py-20 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              AI-Powered Code Intelligence
            </h2>
            <p className="text-muted-foreground text-lg mb-12 font-bold">
              Advanced AI features that make your code better, faster, and more
              secure
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {[
                {
                  icon: <Brain className="w-8 h-8 text-primary" />,
                  title: "AI Code Review",
                  desc: "Get instant feedback on code quality, security vulnerabilities, and best practices with our AI-powered review system.",
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-primary" />,
                  title: "Smart Improvements",
                  desc: "Receive contextual suggestions for performance optimization, code refactoring, and modern best practices.",
                },
                {
                  icon: <FileText className="w-8 h-8 text-primary" />,
                  title: "Auto Documentation",
                  desc: "Generate comprehensive documentation, comments, and explanations automatically using advanced AI models.",
                },
                {
                  icon: <Search className="w-8 h-8 text-primary" />,
                  title: "Deep Code Analysis",
                  desc: "Comprehensive static and dynamic analysis to identify bugs, performance bottlenecks, and security issues.",
                },
                {
                  icon: <Code className="w-8 h-8 text-primary" />,
                  title: "Language Agnostic",
                  desc: "Support for Python, JavaScript, TypeScript, Go, Rust, and 20+ programming languages with intelligent analysis.",
                },
                {
                  icon: <Zap className="w-8 h-8 text-primary" />,
                  title: "Real-time Feedback",
                  desc: "Get instant suggestions as you type, with continuous learning from community feedback and best practices.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group p-8 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] text-left flex flex-col items-start gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-primary">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* --- End AI Feature Section --- */}

        {/* --- AI Code Review Example Section --- */}
        <section className="py-24 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full z-0" />

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight text-white">
              Powered by Advanced AI Models
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-left">
                {[
                  {
                    color: "text-green-400",
                    bg: "bg-green-400/10",
                    title: "Security-First Analysis",
                    desc: "Hybrid AI models trained on security-specific datasets to identify vulnerabilities and suggest secure coding practices.",
                  },
                  {
                    color: "text-blue-400",
                    bg: "bg-blue-400/10",
                    title: "Natural Language Processing",
                    desc: "Large language models that understand code context and generate human-readable explanations and documentation.",
                  },
                  {
                    color: "text-primary",
                    bg: "bg-primary/10",
                    title: "Continuous Learning",
                    desc: "AI models that improve over time by learning from community feedback and emerging coding patterns.",
                  },
                  {
                    color: "text-red-400",
                    bg: "bg-red-400/10",
                    title: "Performance Optimization",
                    desc: "Intelligent suggestions for code optimization, memory management, and algorithmic improvements.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start space-x-6 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
                  >
                    <div
                      className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}
                    >
                      <Check className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-white">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-black p-4 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl text-left overflow-hidden">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="ml-4 text-xs text-muted-foreground flex items-center gap-2 font-mono uppercase tracking-widest">
                      <Brain className="w-3 h-3 text-primary" />
                      AI Review Engine v4.0
                    </div>
                  </div>
                  <SyntaxHighlighter
                    style={irBlack}
                    showLineNumbers
                    wrapLines
                    customStyle={{
                      fontFamily: "var(--font-sans), monospace",
                      fontSize: "0.9rem",
                      background: "transparent",
                      padding: "0",
                      margin: "0",
                    }}
                    codeTagProps={{
                      style: { fontFamily: "var(--font-sans), monospace" },
                    }}
                  >
                    {aiReviewCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --- End AI Example Section --- */}
      </main>

      <FooterLanding />
    </div>
  );
}
