"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const { toast } = useToast();
  const [showTick, setShowTick] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
    setShowTick(true);
    setTimeout(() => setShowTick(false), 3000);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-6 w-6 cursor pointer  "
      onClick={handleClick}
    >
      {showTick ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </Button>
  );
}
