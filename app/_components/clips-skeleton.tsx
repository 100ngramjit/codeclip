import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHighlightedCode = () => {
  return (
    <div className="w-full max-w-3xl">
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-gray-800 p-2 sm:p-4 my-2 rounded-lg w-full"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 overflow-auto">
            <Skeleton className="h-4 w-1/2 bg-gray-700" />
            <Skeleton className="h-4 w-1/4 bg-gray-700 mt-1 sm:mt-0" />
          </div>
          <div className="mt-4">
            {[...Array(5)].map((_, lineIndex) => (
              <Skeleton
                key={lineIndex}
                className="h-4 w-full bg-gray-700 mt-2"
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonHighlightedCode;
