"use client";
import React, { useRef, useState, useCallback } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  googlecode,
  nightOwl,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Check, ImageDown } from "lucide-react";
import TooltipEnclosure from "./tooltip-enclosure";
import { useTheme } from "next-themes";

const MacWindow: React.FC<{ title: string; code: string; lang: string }> = ({
  title,
  code,
  lang,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const hiddenContainerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const handleDownload = useCallback(async () => {
    if (!hiddenContainerRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const canvas = await html2canvas(hiddenContainerRef.current, {
        scale: 1,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-code.png`;
      link.click();
    } catch (error) {
      console.error("Error capturing content:", error);
    } finally {
      setTimeout(() => setIsCapturing(false), 3000);
    }
  }, [title, isCapturing]);

  const generatePreviewImage = useCallback(async () => {
    if (!hiddenContainerRef.current) return;

    const canvas = await html2canvas(hiddenContainerRef.current, {
      scale: 0.4,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    setPreviewImage(canvas.toDataURL("image/png"));
  }, []);

  return (
    <>
      <div
        ref={hiddenContainerRef}
        className="absolute left-[-9999px] top-[-9999px] max-w-max max-h-max"
      >
        <div className="overflow-hidden shadow-sm">
          <div className="dark:bg-slate-800 flex items-center justify-between bg-gray-100 p-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full" />
              <div className="w-4 h-4 bg-green-400 rounded-full" />
            </div>
            <div className="text-sm pb-2">{title}</div>
            <div className="w-6" />
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-300 via-purple-500 to-pink-600">
            <SyntaxHighlighter
              style={theme === "dark" ? nightOwl : googlecode}
              language={lang}
              showLineNumbers
              wrapLines={false}
              customStyle={{ fontSize: "12px", margin: 0 }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <TooltipEnclosure
        content={
          <>
            Image download preview
            <img src={previewImage} alt="Code Preview" />
          </>
        }
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor pointer"
          onMouseEnter={generatePreviewImage}
          onClick={handleDownload}
        >
          {isCapturing ? (
            <Check className="w-4 h-4" />
          ) : (
            <ImageDown className="w-4 h-4" />
          )}
        </Button>
      </TooltipEnclosure>
    </>
  );
};

export default MacWindow;
