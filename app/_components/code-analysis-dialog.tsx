"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Loader2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Activity,
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

interface AnalysisResult {
  overall: {
    score: number;
    grade: string;
    maintainabilityIndex: number;
  };
  complexity: {
    cyclomatic: number;
    cognitive: number;
    halstead: {
      difficulty: number;
      effort: number;
      volume: number;
    };
  };
  quality: {
    codeSmells: Array<{
      type: string;
      severity: string;
      message: string;
      line?: number;
      suggestion: string;
    }>;
    duplications: Array<{
      lines: string;
      occurrences: number;
      suggestion: string;
    }>;
    testability: number;
  };
  performance: {
    potentialIssues: Array<{
      type: string;
      impact: string;
      description: string;
      suggestion: string;
    }>;
    optimizationOpportunities: string[];
  };
  security: {
    vulnerabilities: Array<{
      type: string;
      severity: string;
      description: string;
      recommendation: string;
    }>;
    riskScore: number;
  };
  metrics: {
    linesOfCode: number;
    linesOfComments: number;
    commentRatio: number;
    dependencies: number;
    technicalDebt: string;
  };
}

const CodeAnalysisDialog = ({ clip }: { clip: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleCodeAnalysis = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/api/code-analysis", {
        content: clip.code,
        language: clip.lang,
        fileName: clip.fileName,
      });

      if (!response.data?.analysis) {
        throw new Error("No analysis result returned");
      }

      setAnalysis(response.data.analysis);
      toast({
        title: "Analysis Complete 📊",
        description: "Comprehensive complexity analysis finished successfully.",
      });
    } catch (error) {
      console.error("Error analyzing code:", error);
      toast({
        title: "Analysis Error",
        description: "Could not complete complexity analysis. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600";
      case "B":
        return "text-blue-600";
      case "C":
        return "text-yellow-600";
      case "D":
        return "text-orange-600";
      case "F":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getComplexityLevel = (complexity: number) => {
    if (complexity <= 5) return { level: "Low", color: "text-green-600" };
    if (complexity <= 10) return { level: "Medium", color: "text-yellow-600" };
    if (complexity <= 15) return { level: "High", color: "text-orange-600" };
    return { level: "Very High", color: "text-red-600" };
  };

  return (
    <TooltipEnclosure content="complexity analysis">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Complexity Analysis - {clip.fileName}
            </DialogTitle>
            <DialogDescription>
              Deep code analysis including complexity, quality, performance, and
              security
            </DialogDescription>
          </DialogHeader>

          {!analysis ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Activity className="w-16 h-16 text-muted-foreground" />
              <p className="text-lg font-medium">Ready to analyze your code</p>
              <p className="text-sm text-muted-foreground text-center">
                Get comprehensive insights on complexity, quality, performance,
                and security
              </p>
              <Button
                onClick={handleCodeAnalysis}
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
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="complexity">Complexity</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <div
                      className={`text-3xl font-bold ${getGradeColor(
                        analysis.overall.grade
                      )}`}
                    >
                      {analysis.overall.grade}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Overall Grade
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold">
                      {analysis.overall.score}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Quality Score
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {analysis.overall.maintainabilityIndex}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Maintainability
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      {analysis.metrics.linesOfCode}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lines of Code
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-2 m-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Code Health
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quality Score</span>
                          <span>{analysis.overall.score}%</span>
                        </div>
                        <Progress
                          value={analysis.overall.score}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Testability</span>
                          <span>{analysis.quality.testability}%</span>
                        </div>
                        <Progress
                          value={analysis.quality.testability}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Comment Ratio</span>
                          <span>
                            {(analysis.metrics.commentRatio * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={analysis.metrics.commentRatio * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-2 m-4">
                    <h3 className="font-semibold mb-3">Key Metrics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Lines of Code:</span>
                        <span className="font-mono">
                          {analysis.metrics.linesOfCode}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lines of Comments:</span>
                        <span className="font-mono">
                          {analysis.metrics.linesOfComments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dependencies:</span>
                        <span className="font-mono">
                          {analysis.metrics.dependencies}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technical Debt:</span>
                        <Badge variant="outline" className="ml-2">
                          {analysis.metrics.technicalDebt}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="complexity">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Card className="p-2 m-4">
                    <h3 className="font-semibold mb-3">
                      Cyclomatic Complexity
                    </h3>
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold ${
                          getComplexityLevel(analysis.complexity.cyclomatic)
                            .color
                        }`}
                      >
                        {analysis.complexity.cyclomatic}
                      </div>
                      <div
                        className={`text-sm ${
                          getComplexityLevel(analysis.complexity.cyclomatic)
                            .color
                        }`}
                      >
                        {
                          getComplexityLevel(analysis.complexity.cyclomatic)
                            .level
                        }
                      </div>
                    </div>
                  </Card>

                  <Card className="p-2 m-4">
                    <h3 className="font-semibold mb-3">Cognitive Complexity</h3>
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold ${
                          getComplexityLevel(analysis.complexity.cognitive)
                            .color
                        }`}
                      >
                        {analysis.complexity.cognitive}
                      </div>
                      <div
                        className={`text-sm ${
                          getComplexityLevel(analysis.complexity.cognitive)
                            .color
                        }`}
                      >
                        {
                          getComplexityLevel(analysis.complexity.cognitive)
                            .level
                        }
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-2 m-4">
                  <h3 className="font-semibold mb-3">Halstead Metrics</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-500">
                        {analysis.complexity.halstead.difficulty.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Difficulty
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-500">
                        {analysis.complexity.halstead.effort.toFixed(0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Effort
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {analysis.complexity.halstead.volume.toFixed(0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Volume
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="quality">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    <Card className="p-2 m-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        Code Smells ({analysis.quality.codeSmells.length})
                      </h3>
                      {analysis.quality.codeSmells.length === 0 ? (
                        <div className="text-center py-4">
                          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No code smells detected!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {analysis.quality.codeSmells.map((smell, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-yellow-200 pl-4"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary">{smell.type}</Badge>
                                <Badge
                                  variant="outline"
                                  className={getSeverityColor(smell.severity)}
                                >
                                  {smell.severity}
                                </Badge>
                                {smell.line && (
                                  <Badge variant="outline">
                                    Line {smell.line}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm mb-1">{smell.message}</p>
                              <p className="text-xs text-muted-foreground">
                                {smell.suggestion}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>

                    {analysis.quality.duplications.length > 0 && (
                      <Card className="p-2 m-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-red-500" />
                          Code Duplications (
                          {analysis.quality.duplications.length})
                        </h3>
                        <div className="space-y-3">
                          {analysis.quality.duplications.map((dup, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-red-200 pl-4"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="destructive">
                                  {dup.occurrences} occurrences
                                </Badge>
                                <Badge variant="outline">
                                  Lines {dup.lines}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {dup.suggestion}
                              </p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="performance">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    <Card className="p-2 m-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-orange-500" />
                        Performance Issues (
                        {analysis.performance.potentialIssues.length})
                      </h3>
                      {analysis.performance.potentialIssues.length === 0 ? (
                        <div className="text-center py-4">
                          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No performance issues detected!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {analysis.performance.potentialIssues.map(
                            (issue, index) => (
                              <div
                                key={index}
                                className="border-l-2 border-orange-200 pl-4"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary">
                                    {issue.type}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={getSeverityColor(issue.impact)}
                                  >
                                    {issue.impact} Impact
                                  </Badge>
                                </div>
                                <p className="text-sm mb-1">
                                  {issue.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {issue.suggestion}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </Card>

                    {analysis.performance.optimizationOpportunities.length >
                      0 && (
                      <Card className="p-2 m-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          Optimization Opportunities
                        </h3>
                        <div className="space-y-2">
                          {analysis.performance.optimizationOpportunities.map(
                            (opportunity, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                <p className="text-sm">{opportunity}</p>
                              </div>
                            )
                          )}
                        </div>
                      </Card>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-4">
                  <Card className="p-2 m-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        Security Risk Score
                      </h3>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            analysis.security.riskScore > 70
                              ? "text-red-500"
                              : analysis.security.riskScore > 40
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {analysis.security.riskScore}/100
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Risk Level
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={analysis.security.riskScore}
                      className="h-3"
                    />
                  </Card>

                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {analysis.security.vulnerabilities.length === 0 ? (
                        <Card className="p-2 m-4 text-center">
                          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No security vulnerabilities detected!
                          </p>
                        </Card>
                      ) : (
                        analysis.security.vulnerabilities.map((vuln, index) => (
                          <Card key={index} className="p-2 m-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{vuln.type}</Badge>
                              <Badge
                                variant={
                                  vuln.severity === "high"
                                    ? "destructive"
                                    : vuln.severity === "medium"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {vuln.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{vuln.description}</p>
                            <div className="bg-muted p-2 rounded text-xs">
                              <strong>Recommendation:</strong>{" "}
                              {vuln.recommendation}
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            {analysis && (
              <Button onClick={handleCodeAnalysis} disabled={isLoading}>
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

export default CodeAnalysisDialog;
