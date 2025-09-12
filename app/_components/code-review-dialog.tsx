"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Eye,
  Loader2,
  FileText,
} from "lucide-react";
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
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import TooltipEnclosure from "./tooltip-enclosure";

interface ReviewIssue {
  type: "error" | "warning" | "info" | "suggestion";
  severity: "high" | "medium" | "low";
  line?: number;
  message: string;
  rule?: string;
  category: string;
}

interface CodeReviewResult {
  score: number;
  issues: ReviewIssue[];
  suggestions: string[];
  complexity: {
    cyclomatic: number;
    cognitive: number;
  };
  metrics: {
    linesOfCode: number;
    duplicateLines: number;
    testCoverage?: number;
  };
}

const CodeReviewDialog = ({ clip }: { clip: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(
    null
  );
  const { toast } = useToast();

  const handleCodeReview = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/api/code-review", {
        content: clip.code,
        language: clip.lang,
        fileName: clip.fileName,
      });

      if (!response.data?.reviewResult) {
        throw new Error("No review result returned");
      }

      setReviewResult(response.data.reviewResult);
      toast({
        title: "Code Review Complete ✅",
        description: "Analysis completed successfully.",
      });
    } catch (error) {
      console.error("Error reviewing code:", error);
      toast({
        title: "Review Error",
        description: "Could not complete code review. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline",
    } as const;

    return (
      <Badge variant={variants[severity as keyof typeof variants] || "outline"}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <TooltipEnclosure content="code review">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Code Review - {clip.fileName}
            </DialogTitle>
            <DialogDescription>
              Comprehensive code analysis and quality assessment
            </DialogDescription>
          </DialogHeader>

          {!reviewResult ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Eye className="w-16 h-16 text-muted-foreground" />
              <p className="text-lg font-medium">Ready to analyze your code</p>
              <p className="text-sm text-muted-foreground text-center">
                Get insights on code quality, potential issues, and improvement
                suggestions
              </p>
              <Button
                onClick={handleCodeReview}
                disabled={isLoading}
                className="mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Code...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Start Code Review
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="issues">
                  Issues ({reviewResult.issues.length})
                </TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        reviewResult.score
                      )}`}
                    >
                      {reviewResult.score}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Quality Score
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-500">
                      {
                        reviewResult.issues.filter((i) => i.type === "error")
                          .length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">Errors</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">
                      {
                        reviewResult.issues.filter((i) => i.type === "warning")
                          .length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Warnings
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {reviewResult.complexity.cyclomatic}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Complexity
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Quick Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lines of Code:</span>
                      <span className="font-mono">
                        {reviewResult.metrics.linesOfCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cyclomatic Complexity:</span>
                      <span className="font-mono">
                        {reviewResult.complexity.cyclomatic}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cognitive Complexity:</span>
                      <span className="font-mono">
                        {reviewResult.complexity.cognitive}
                      </span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="issues">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {reviewResult.issues.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium">No issues found!</p>
                        <p className="text-sm text-muted-foreground">
                          Your code looks clean.
                        </p>
                      </div>
                    ) : (
                      reviewResult.issues.map((issue, index) => (
                        <Card key={index} className="p-2 m-4">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {getSeverityBadge(issue.severity)}
                                {issue.line && (
                                  <Badge variant="outline">
                                    Line {issue.line}
                                  </Badge>
                                )}
                                {issue.rule && (
                                  <Badge variant="secondary">
                                    {issue.rule}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm font-medium">
                                {issue.category}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {issue.message}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="metrics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Code Metrics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Lines of Code:</span>
                        <span className="font-mono">
                          {reviewResult.metrics.linesOfCode}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duplicate Lines:</span>
                        <span className="font-mono">
                          {reviewResult.metrics.duplicateLines}
                        </span>
                      </div>
                      {reviewResult.metrics.testCoverage && (
                        <div className="flex justify-between">
                          <span>Test Coverage:</span>
                          <span className="font-mono">
                            {reviewResult.metrics.testCoverage}%
                          </span>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Complexity Analysis</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Cyclomatic Complexity:</span>
                        <span className="font-mono">
                          {reviewResult.complexity.cyclomatic}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cognitive Complexity:</span>
                        <span className="font-mono">
                          {reviewResult.complexity.cognitive}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="suggestions">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {reviewResult.suggestions.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium">
                          No suggestions needed!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your code follows best practices.
                        </p>
                      </div>
                    ) : (
                      reviewResult.suggestions.map((suggestion, index) => (
                        <Card key={index} className="p-2 m-2">
                          <div className="flex items-start gap-3">
                            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                            <p className="text-sm">{suggestion}</p>
                          </div>
                        </Card>
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
            {reviewResult && (
              <Button onClick={handleCodeReview} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Re-analyze"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipEnclosure>
  );
};

export default CodeReviewDialog;
