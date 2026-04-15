import Header from "@/app/_components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background isolate">
      {/* Premium Background Layer */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        {/* Base Background */}
        <div className="absolute inset-0 bg-background" />

        {/* Ambient Gradients - Animated Blobs */}
        <div className="absolute top-[0%] left-[0%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] rounded-full bg-primary/15 blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.8] [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)] dark:opacity-[0.6]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dashboard-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  fill="currentColor"
                  className="text-foreground/40"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dashboard-grid)" />
          </svg>
        </div>

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
