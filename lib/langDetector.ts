export function mapLanguage(detectedLanguage: string): string {
  switch (detectedLanguage.toLowerCase()) {
    case "c":
      return "c";
    case "dockerfile":
      return "dockerfile";
    case "javascript":
      return "javascript";
    case "pascal":
      return "delphi";
    case "sql":
      return "sql";
    case "c++":
      return "cpp";
    case "elixir":
      return "elixir";
    case "julia":
      return "julia";
    case "php":
      return "php";
    case "yaml":
      return "yaml";
    case "c#":
      return "csharp";
    case "go":
      return "go";
    case "kotlin":
      return "kotlin";
    case "python":
      return "python";
    case "typescript":
      return "typescript";
    case "clojure":
      return "clojure";
    case "html":
      return "xml";
    case "lua":
      return "lua";
    case "ruby":
      return "ruby";
    case "css":
      return "css";
    case "java":
      return "java";
    case "markdown":
      return "markdown";
    case "rust":
      return "rust";
    default:
      return "";
  }
}
