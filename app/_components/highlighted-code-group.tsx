import { Card } from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const HighlightedCode = ({ response }: any) => {
  return (
    <div className="w-full max-w-3xl">
      {response.data.map((clip: any) => (
        <Card
          key={clip.id}
          className="bg-gray-800 p-2 sm:p-4 my-2 rounded-lg w-full"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 overflow-auto">
            <p className="text-white text-sm sm:text-base mb-1 sm:mb-0 break-all">
              {clip.fileName}
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              by {clip?.userEmail}
            </p>
          </div>
          <SyntaxHighlighter
            style={nightOwl}
            showLineNumbers
            wrapLongLines
            customStyle={{
              fontSize: "0.8rem",
            }}
          >
            {clip.code}
          </SyntaxHighlighter>
        </Card>
      ))}
    </div>
  );
};
export default HighlightedCode;