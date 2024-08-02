"use client";
import React, { useRef, useState, useCallback } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/ui/loader-button";
import { ImageDown, Loader2 } from "lucide-react";
import TooltipEnclosure from "./tooltip-enclosure";

const MacWindow: React.FC<{ title: string; code: string }> = ({
  title,
  code,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const hiddenContainerRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!hiddenContainerRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const canvas = await html2canvas(hiddenContainerRef.current, {
        scale: 2,
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
      setIsCapturing(false);
    }
  }, [title, isCapturing]);

  return (
    <>
      <div
        ref={hiddenContainerRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "max-content",
          height: "max-content",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f3f4f6",
              padding: "8px 16px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#fbbf24",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#34d399",
                  borderRadius: "50%",
                }}
              />
            </div>
            <span style={{ color: "#374151", fontWeight: 500 }}>{title}</span>
            <div style={{ width: "24px" }} />
          </div>
          <div
            style={{
              padding: "16px",
              background:
                "linear-gradient(to right, #60a5fa, #8b5cf6, #ec4899)",
            }}
          >
            <SyntaxHighlighter
              style={nightOwl}
              showLineNumbers
              wrapLines={false}
              customStyle={{
                fontSize: "14px",
                margin: 0,
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <TooltipEnclosure content="download image">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor pointer  "
          onClick={handleDownload}
        >
          {isCapturing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImageDown className="w-4 h-4" />
          )}
        </Button>
      </TooltipEnclosure>
    </>
  );
};

export default MacWindow;
