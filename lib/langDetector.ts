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

export function reverseMapLanguage(mappedLanguage: string): string {
  switch (mappedLanguage.toLowerCase()) {
    case "c":
      return "C";
    case "dockerfile":
      return "Dockerfile";
    case "javascript":
      return "JavaScript";
    case "delphi":
      return "Pascal";
    case "sql":
      return "SQL";
    case "cpp":
      return "C++";
    case "elixir":
      return "Elixir";
    case "julia":
      return "Julia";
    case "php":
      return "PHP";
    case "yaml":
      return "YAML";
    case "csharp":
      return "C#";
    case "go":
      return "Go";
    case "kotlin":
      return "Kotlin";
    case "python":
      return "Python";
    case "typescript":
      return "TypeScript";
    case "clojure":
      return "Clojure";
    case "xml":
      return "HTML";
    case "lua":
      return "Lua";
    case "ruby":
      return "Ruby";
    case "css":
      return "CSS";
    case "java":
      return "Java";
    case "markdown":
      return "Markdown";
    case "rust":
      return "Rust";
    default:
      return "";
  }
}
