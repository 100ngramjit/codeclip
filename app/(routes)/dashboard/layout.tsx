import Header from "@/app/_components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background isolate">
      {/* Premium Background with App Colors */}
      <div className="fixed inset-0 -z-20 bg-background" />
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,hsla(var(--primary-raw),0.15),transparent_70%),radial-gradient(circle_at_80%_80%,hsla(var(--primary-raw),0.1),transparent_70%)]" />

      <div className="relative z-10">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
