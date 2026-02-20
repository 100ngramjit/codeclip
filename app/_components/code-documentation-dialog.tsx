"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, Download, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  nightOwl,
  googlecode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import TooltipEnclosure from "./tooltip-enclosure";
import { CopyButton } from "./copy-button";

interface DocumentationResult {
  overview: string;
  functions: Array<{
    name: string;
    description: string;
    parameters: Array<{ name: string; type: string; description: string }>;
    returns: { type: string; description: string };
    example?: string;
  }>;
  components: Array<{
    name: string;
    description: string;
    props: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
    }>;
    usage: string;
  }>;
  classes: Array<{
    name: string;
    description: string;
    methods: Array<{ name: string; description: string; parameters: string[] }>;
    properties: Array<{ name: string; type: string; description: string }>;
  }>;
  jsDoc: string;
  markdown: string;
  apiDocs: any;
}

type DocumentationFormat = "jsdoc" | "markdown" | "api" | "interactive";

const DocumentationDialog = ({ clip }: { clip: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentation, setDocumentation] =
    useState<DocumentationResult | null>(null);
  const [selectedFormat, setSelectedFormat] =
    useState<DocumentationFormat>("jsdoc");
  const { theme } = useTheme();
  const { toast } = useToast();
  const exportAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedFormat("jsdoc");
  }, [documentation]);

  const handleGenerateDocumentation = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/api/generate-docs", {
        content: clip.code,
        language: clip.lang,
        fileName: clip.fileName,
        format: "comprehensive",
      });

      if (!response.data?.documentation) {
        throw new Error("No documentation generated");
      }

      setDocumentation(response.data.documentation);
      toast({
        title: "Documentation Generated 📚",
        description: "Comprehensive documentation created successfully.",
      });
    } catch (error) {
      console.error("Error generating documentation:", error);
      toast({
        title: "Documentation Error",
        description: "Could not generate documentation. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getDocumentationContent = () => {
    if (!documentation) return "";
    switch (selectedFormat) {
      case "jsdoc":
        return documentation.jsDoc || "";
      case "markdown":
        return documentation.markdown || "";
      case "api":
        if (
          documentation.apiDocs &&
          typeof documentation.apiDocs === "object"
        ) {
          return JSON.stringify(documentation.apiDocs, null, 2);
        }
        return documentation.apiDocs || "";
      default:
        return "";
    }
  };

  const getFileExtension = () => {
    switch (selectedFormat) {
      case "jsdoc":
        return ".js";
      case "markdown":
        return ".md";
      case "api":
        return ".json";
      default:
        return ".txt";
    }
  };

  return (
    <TooltipEnclosure content="generate documentation">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Code Documentation - {clip.fileName}
            </DialogTitle>
            <DialogDescription>
              Generate comprehensive documentation for your code
            </DialogDescription>
          </DialogHeader>
          {!documentation ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <BookOpen className="w-16 h-16 text-muted-foreground" />
              <p className="text-lg font-medium">Ready to document your code</p>
              <p className="text-sm text-muted-foreground text-center">
                Generate JSDoc, Markdown, API documentation, and interactive
                guides
              </p>
              <Button
                onClick={handleGenerateDocumentation}
                disabled={isLoading}
                className="mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Documentation...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Documentation
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="interactive" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="interactive">Interactive</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
                <TabsTrigger value="functions">Functions</TabsTrigger>
              </TabsList>

              <TabsContent value="interactive" className="space-y-4">
                <div className="border rounded-lg p-4 max-h-48 overflow-auto">
                  <h3 className="font-semibold mb-3">Code Overview</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {documentation.overview}
                  </p>
                </div>
                {documentation.functions.length > 0 && (
                  <div className="border rounded-lg p-4 max-h-52 overflow-auto">
                    <h3 className="font-semibold mb-3">
                      Functions ({documentation.functions.length})
                    </h3>
                    <div className="space-y-3">
                      {documentation.functions
                        .slice(0, 3)
                        .map((func, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-blue-200 pl-4"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary">{func.name}</Badge>
                              <span className="text-sm text-muted-foreground">
                                ({func.parameters.length} params)
                              </span>
                            </div>
                            <p className="text-sm">{func.description}</p>
                          </div>
                        ))}
                      {documentation.functions.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          +{documentation.functions.length - 3} more
                          functions...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="export" className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <Select
                    value={selectedFormat}
                    onValueChange={(value) =>
                      setSelectedFormat(value as DocumentationFormat)
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jsdoc">JSDoc Format</SelectItem>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="api">API Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <CopyButton
                      text={getDocumentationContent()}
                      className="h-8"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleDownload(
                          getDocumentationContent(),
                          `${clip.fileName}_docs${getFileExtension()}`,
                        )
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <ScrollArea
                  className="h-[330px] border rounded-lg bg-muted"
                  ref={exportAreaRef}
                >
                  <SyntaxHighlighter
                    language={
                      selectedFormat === "markdown"
                        ? "markdown"
                        : selectedFormat === "api"
                          ? "json"
                          : "javascript"
                    }
                    style={theme === "dark" ? nightOwl : googlecode}
                    customStyle={{
                      fontFamily: "'Source Code Pro', monospace",
                      margin: 0,
                      padding: "1rem",
                      background: "transparent",
                      fontSize: "0.93rem",
                      minWidth: 0,
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                    wrapLongLines
                    codeTagProps={{
                      style: { fontFamily: "'Source Code Pro', monospace" },
                    }}
                  >
                    {getDocumentationContent()}
                  </SyntaxHighlighter>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="functions">
                <ScrollArea className="h-[330px]">
                  <div className="space-y-4">
                    {documentation.functions.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No functions detected in this code
                      </div>
                    ) : (
                      documentation.functions.map((func, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="default">{func.name}</Badge>
                            <Badge variant="outline">{func.returns.type}</Badge>
                          </div>
                          <p className="text-sm mb-3">{func.description}</p>
                          {func.parameters.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-sm font-medium mb-1">
                                Parameters:
                              </h5>
                              <div className="space-y-1">
                                {func.parameters.map((param, pIndex) => (
                                  <div
                                    key={pIndex}
                                    className="text-xs bg-muted p-2 rounded"
                                  >
                                    <code className="font-mono">
                                      {param.name}
                                    </code>
                                    <Badge
                                      variant="outline"
                                      className="ml-2 text-xs"
                                    >
                                      {param.type}
                                    </Badge>
                                    <p className="mt-1 text-muted-foreground">
                                      {param.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {func.example && (
                            <div>
                              <h5 className="text-sm font-medium mb-1">
                                Example:
                              </h5>
                              <SyntaxHighlighter
                                language="javascript"
                                style={theme === "dark" ? nightOwl : googlecode}
                                customStyle={{
                                  fontFamily: "'Source Code Pro', monospace",
                                  fontSize: "0.75rem",
                                  padding: "0.5rem",
                                  margin: 0,
                                }}
                                codeTagProps={{
                                  style: {
                                    fontFamily: "'Source Code Pro', monospace",
                                  },
                                }}
                              >
                                {func.example}
                              </SyntaxHighlighter>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            {documentation && (
              <Button
                onClick={handleGenerateDocumentation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Regenerate"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipEnclosure>
  );
};

export default DocumentationDialog;
