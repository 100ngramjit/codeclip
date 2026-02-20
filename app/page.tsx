import { Button } from "@/components/ui/button";
import {
  FileCode2,
  RocketIcon,
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
import { FlipWords } from "./_components/flip-words";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import CarousalLanding from "./_components/carousal-landing";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

  return (
    <div>
      <header>
        <nav className="flex justify-between items-center p-6">
          <div className="flex justify-start gap-2">
            <FileCode2 className="w-10 h-10" />
            <span className="text-3xl font-black">codeclip</span>
          </div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>

      <main className="text-center p-5">
        {/* --- Hero Section --- */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-black">
                Create code &{" "}
                <FlipWords
                  words={[
                    "get AI-powered reviews",
                    "improve with smart suggestions",
                    "auto-generate documentation",
                    "share with the community",
                    "download as beautiful images",
                  ]}
                />
              </h1>
              <p className="text-muted-foreground text-md md:text-xl max-w-3xl mx-auto leading-relaxed font-bold">
                The world's most advanced code sharing platform powered by AI.
                Get instant code reviews, smart improvements, and automatic
                documentation while collaborating with developers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <Link href="/dashboard">
                  <Button className="px-8 py-4 text-md font-black bg-lime-400 hover:bg-lime-500 text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150">
                    {user ? "Go to dashboard" : "Get Started"}
                    <RocketIcon className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* --- End Hero Section --- */}

        {/* --- AI-Enhanced Feature Section --- */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              AI-Powered Code Intelligence
            </h2>
            <p className="text-muted-foreground text-lg mb-12 font-bold">
              Advanced AI features that make your code better, faster, and more
              secure
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Neobrutalism Feature Cards */}
              {[
                {
                  icon: <Brain className="w-8 h-8 text-white" />,
                  bg: "bg-blue-500",
                  title: "AI Code Review",
                  desc: "Get instant feedback on code quality, security vulnerabilities, and best practices with our AI-powered review system.",
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-white" />,
                  bg: "bg-green-500",
                  title: "Smart Improvements",
                  desc: "Receive contextual suggestions for performance optimization, code refactoring, and modern best practices.",
                },
                {
                  icon: <FileText className="w-8 h-8 text-white" />,
                  bg: "bg-orange-500",
                  title: "Auto Documentation",
                  desc: "Generate comprehensive documentation, comments, and explanations automatically using advanced AI models.",
                },
                {
                  icon: <Search className="w-8 h-8 text-white" />,
                  bg: "bg-indigo-500",
                  title: "Deep Code Analysis",
                  desc: "Comprehensive static and dynamic analysis to identify bugs, performance bottlenecks, and security issues.",
                },
                {
                  icon: <Code className="w-8 h-8 text-white" />,
                  bg: "bg-purple-500",
                  title: "Language Agnostic",
                  desc: "Support for Python, JavaScript, TypeScript, Go, Rust, and 20+ programming languages with intelligent analysis.",
                },
                {
                  icon: <Zap className="w-8 h-8 text-white" />,
                  bg: "bg-yellow-500",
                  title: "Real-time Feedback",
                  desc: "Get instant suggestions as you type, with continuous learning from community feedback and best practices.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="border-4 border-black dark:border-white bg-white dark:bg-slate-900 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-150"
                >
                  <div
                    className={`w-16 h-16 ${card.bg} border-4 border-black dark:border-white flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{card.title}</h3>
                  <p className="text-muted-foreground font-bold">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* --- End AI Feature Section --- */}

        {/* --- AI Code Review Example Section --- */}
        <section className="py-20 border-b-4 border-black dark:border-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
              Powered by Advanced AI Models
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                {[
                  {
                    color: "bg-green-500",
                    title: "Security-First Analysis",
                    desc: "Hybrid AI models trained on security-specific datasets to identify vulnerabilities and suggest secure coding practices.",
                  },
                  {
                    color: "bg-blue-500",
                    title: "Natural Language Processing",
                    desc: "Large language models that understand code context and generate human-readable explanations and documentation.",
                  },
                  {
                    color: "bg-purple-500",
                    title: "Continuous Learning",
                    desc: "AI models that improve over time by learning from community feedback and emerging coding patterns.",
                  },
                  {
                    color: "bg-red-500",
                    title: "Performance Optimization",
                    desc: "Intelligent suggestions for code optimization, memory management, and algorithmic improvements.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 ${item.color} border-4 border-black dark:border-white flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2">{item.title}</h3>
                      <p className="text-muted-foreground font-bold">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 md:p-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] text-left">
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2 font-bold">
                  <Brain className="w-4 h-4" />
                  AI Review Example
                </div>
                <SyntaxHighlighter
                  style={nightOwl}
                  showLineNumbers
                  wrapLines
                  customStyle={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "0.85rem",
                    borderRadius: "0px",
                    border: "3px solid black",
                  }}
                  codeTagProps={{
                    style: { fontFamily: "'Source Code Pro', monospace" },
                  }}
                >
                  {aiReviewCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
        {/* --- End AI Example Section --- */}

        {/* --- AI Stats Section --- */}
        <section className="py-20 ">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              Trusted by Developers Worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <Shield className="w-8 h-8 text-white" />,
                  bg: "bg-blue-500",
                  value: "99.9%",
                  label: "Security Issues Detected",
                },
                {
                  icon: <Clock className="w-8 h-8 text-white" />,
                  bg: "bg-green-500",
                  value: "2.3x",
                  label: "Faster Code Reviews",
                },
                {
                  icon: <Target className="w-8 h-8 text-white" />,
                  bg: "bg-orange-500",
                  value: "95%",
                  label: "Code Quality Improvement",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
                >
                  <div
                    className={`w-16 h-16 ${stat.bg} border-4 border-black dark:border-white flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Enhanced Community Features --- */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Everything you need to share code
            </h2>
            <p className="text-muted-foreground text-lg mb-12 font-bold">
              Powerful features designed for developers, by developers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-4 border-black dark:border-white bg-white dark:bg-slate-900 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-150">
                <div className="w-16 h-16 bg-yellow-400 border-4 border-black dark:border-white flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <Zap className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground font-bold">
                  Share your code snippets instantly with syntax highlighting
                  and beautiful formatting powered by AI.
                </p>
              </div>
              <div className="border-4 border-black dark:border-white bg-white dark:bg-slate-900 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-150">
                <div className="w-16 h-16 bg-blue-400 border-4 border-black dark:border-white flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <Globe className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black mb-4">Multi-Language</h3>
                <p className="text-muted-foreground font-bold">
                  Support for all programming languages with intelligent syntax
                  highlighting and AI-powered analysis.
                </p>
              </div>
              <div className="border-4 border-black dark:border-white bg-white dark:bg-slate-900 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-150">
                <div className="w-16 h-16 bg-green-400 border-4 border-black dark:border-white flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <Users className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black mb-4">Community Driven</h3>
                <p className="text-muted-foreground font-bold">
                  Discover, fork, and collaborate on code snippets with
                  developers worldwide, enhanced by AI insights.
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
