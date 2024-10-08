"use client";
import CodeCard from "@/app/_components/code-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const { id } = params;
  const [clip, setClip] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchClipDetails = async () => {
        try {
          const response = await axiosInstance.post("/api/clipdetails", {
            id,
            userId: user?.id,
          });
          setClip(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching clip details:", error);
          setIsLoading(false);
        }
      };

      fetchClipDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-5 mx-auto p-4">
        <Skeleton className="h-12 w-1/2 mb-3" />
        <Card className="p-2 sm:p-4 my-2 rounded-lg w-full">
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
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center mt-5 mx-auto p-4 ">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 text-center text-primary cursor-pointer">
          {clip.fileName}
        </h1>
        <div className="w-full">
          <CodeCard
            clip={clip}
            isEditEnabled={true}
            isDetailsCard={true}
            showTitle={false}
          />
        </div>
      </div>
    );
  }
}
