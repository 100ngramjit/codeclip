import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHighlightedCode = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <Skeleton className="h-10 w-full mb-6" />
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="p-2 sm:p-4 my-2 rounded-lg w-full my-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 overflow-auto">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4 mt-1 sm:mt-0" />
            </div>
            <div className="mt-4">
              {[...Array(5)].map((_, lineIndex) => (
                <Skeleton key={lineIndex} className="h-4 w-full mt-2" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkeletonHighlightedCode;
