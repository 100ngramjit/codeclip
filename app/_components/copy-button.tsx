"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

export function CopyButton({ text }: any) {
  const { toast } = useToast();
  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-6 w-6 cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast({ title: "code copied to clipboard !" });
      }}
    >
      <Copy className="w-4 h-4 text-white" />
    </Button>
  );
}
