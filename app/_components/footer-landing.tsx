import { Mail, MapPinned, PhoneCall } from "lucide-react";

const FooterLanding = () => {
  return (
    <div className="flex flex-col items-center py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <h2 className="text-3xl font-black mb-16 text-center tracking-tight text-white">
        Have a question or feedback? Reach out to us!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {[
          {
            icon: <Mail className="h-8 w-8 text-primary" />,
            title: "Email",
            desc: "Drop us an email",
            detail: "100ngramjit@gmail.com",
          },
          {
            icon: <PhoneCall className="h-8 w-8 text-blue-400" />,
            title: "Phone",
            desc: "Give us a call",
            detail: "+91-9101088439",
          },
          {
            icon: <MapPinned className="h-8 w-8 text-green-400" />,
            title: "Office",
            desc: "Stay connected with us!",
            detail: "Coming Soon!",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group flex flex-col items-center p-10 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 hover:border-primary transition-all duration-300 hover:shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight text-white">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 font-medium uppercase tracking-widest">
              {item.desc}
            </p>
            <p className="text-foreground font-semibold">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLanding;
