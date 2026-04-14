"use client";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  irBlack,
  googlecode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";
import { Share2, Download, MoreVertical, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyButton } from "./copy-button";
import MacWindow from "./mac-window";
import DeleteDialog from "./delete-dialog";
import EditDialog from "./edit-dialog";
import SaveButton from "./save-button";
import TooltipEnclosure from "./tooltip-enclosure";
import { Badge } from "@/components/ui/badge";
import { reverseMapLanguage } from "@/lib/langDetector";
import CodeReviewDialog from "./code-review-dialog";
import DocumentationDialog from "./code-documentation-dialog";
import CodeAnalysisDialog from "./code-analysis-dialog";

const CodeCard = ({
  clip,
  isEditEnabled,
  isDetailsCard = false,
  showTitle = true,
}: any) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const clipURL = `${process.env.NEXT_PUBLIC_HOST}/dashboard/clip/${clip.id}`;

  const formattedCreationTime = formatDistanceToNow(new Date(clip.createdAt), {
    addSuffix: true,
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: clip.fileName,
          url: clipURL,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };

  const handleExportMarkdown = () => {
    const lang = clip.lang || "";
    const author = clip?.userEmail || "Anonymous";
    const createdAt = new Date(clip.createdAt).toLocaleString();

    const mdContent = `# ${clip.fileName || "Snippet"}\n\n> By ${author} on ${createdAt}\n\n\`\`\`${lang}\n${clip.code}\n\`\`\`\n\n> View online: ${clipURL}`;
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${clip.fileName || "snippet"}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card key={clip.id} className="p-4 sm:p-4 my-4 rounded-lg w-full">
      <div className="mb-2">
        {/* Row 1: Title + Badge */}
        {(showTitle || clip.lang) && (
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-1 md:overflow-hidden">
            {showTitle && (
              <Link
                href={clipURL}
                className="md:text-md text-sm break-words md:truncate hover:underline text-primary min-w-0 md:flex-1"
              >
                {clip.fileName}
              </Link>
            )}
            {clip.lang && (
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                {reverseMapLanguage(clip.lang)}
              </Badge>
            )}
          </div>
        )}
        {/* Row 2: Buttons + Email (always on the same line) */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
          <div className="inline-flex items-center flex-shrink-0 gap-1">
            <CopyButton text={clip.code} />
            <TooltipEnclosure content="share">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 cursor-pointer"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </TooltipEnclosure>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="start"
                className="w-60 p-2"
              >
                <div className="flex flex-col gap-1">
                  {user?.id && isDetailsCard && (
                    <SaveButton clip={clip} isMenuItem={true} />
                  )}
                  <MacWindow
                    title={clip.fileName}
                    code={clip.code}
                    lang={clip.lang}
                    userEmail={clip?.userEmail}
                    isMenuItem={true}
                  />
                  {isEditEnabled &&
                    user?.primaryEmailAddress?.emailAddress ===
                      clip.userEmail && (
                      <EditDialog
                        clip={clip}
                        isOpen={isEditDialogOpen}
                        setIsOpen={setIsEditDialogOpen}
                        isMenuItem={true}
                      />
                    )}
                  <DropdownMenuItem
                    onClick={handleExportMarkdown}
                    className="cursor-pointer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download Markdown</span>
                  </DropdownMenuItem>
                  {isEditEnabled &&
                    user?.primaryEmailAddress?.emailAddress ===
                      clip.userEmail && (
                      <DeleteDialog
                        clip={clip}
                        isOpen={isDeleteDialogOpen}
                        setIsOpen={setIsDeleteDialogOpen}
                        isMenuItem={true}
                      />
                    )}
                  {isDetailsCard && (
                    <div className="flex flex-col gap-1 border-t pt-2 mt-1">
                      <span className="text-[10px] uppercase text-muted-foreground font-semibold flex items-center gap-1 px-1">
                        <Sparkles className="w-3 h-3" /> AI Tools
                      </span>
                      <CodeReviewDialog clip={clip} isMenuItem={true} />
                      <DocumentationDialog clip={clip} isMenuItem={true} />
                      <CodeAnalysisDialog clip={clip} isMenuItem={true} />
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-muted-foreground text-xs whitespace-nowrap ml-2">
            by {clip?.userEmail}
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-full">
        <SyntaxHighlighter
          style={theme === "dark" ? irBlack : googlecode}
          language={clip.lang}
          showLineNumbers
          wrapLines
          customStyle={{
            fontFamily: "'Source Code Pro', monospace",
            fontSize: `${isDetailsCard ? "1.2rem" : "0.8rem"}`,
            width: "100%",
            overflowX: isHovered ? "auto" : "hidden",
            transition: "overflow-x 0.3s ease",
          }}
          codeTagProps={{
            style: { fontFamily: "'Source Code Pro', monospace" },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {clip.code}
        </SyntaxHighlighter>
      </div>
      <div className="md:hidden w-full overflow-x-auto">
        <SyntaxHighlighter
          language={clip.lang}
          style={theme === "dark" ? irBlack : googlecode}
          showLineNumbers
          wrapLines
          customStyle={{
            fontFamily: "'Source Code Pro', monospace",
            fontSize: "0.8rem",
            width: "100%",
            overflowX: "auto",
            padding: "1rem",
          }}
          codeTagProps={{
            style: { fontFamily: "'Source Code Pro', monospace" },
          }}
        >
          {clip.code}
        </SyntaxHighlighter>
      </div>
      <p className="text-muted-foreground text-xs opacity-60 py-1">
        {formattedCreationTime}
      </p>
    </Card>
  );
};

export default CodeCard;
