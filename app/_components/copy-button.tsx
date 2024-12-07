"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Check } from "lucide-react";
import TooltipEnclosure from "./tooltip-enclosure";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const { toast } = useToast();
  const [showTick, setShowTick] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
    setShowTick(true);
    setTimeout(() => setShowTick(false), 3000);
  };

  return (
    <TooltipEnclosure content="copy to clipboard">
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 cursor-pointer"
        onClick={handleClick}
      >
        {showTick ? (
          <Check className={`h-4 w-4 ${className}`} />
        ) : (
          <Copy className={`h-4 w-4 ${className}`} />
        )}
      </Button>
    </TooltipEnclosure>
  );
}
