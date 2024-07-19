"use client";

import { useUser } from "@clerk/nextjs";
import axiosInstance from "@/lib/axiosInstance";
import HighlightedCode from "@/app/_components/highlighted-code-group";
import { useEffect, useState } from "react";
import SkeletonHighlightedCode from "@/app/_components/clips-skeleton";

const Page: React.FC = () => {
  const { user } = useUser();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        console.log(user);

        let bodyContent = JSON.stringify({
          userId: user.id,
        });

        let reqOptions = {
          url: "/api/randomclips",
          method: "POST",
          data: bodyContent,
        };

        try {
          const result = await axiosInstance.request(reqOptions);
          console.log(result.data);
          setResponse(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <SkeletonHighlightedCode />;
  }

  if (!response || !response.data.length) {
    return (
      <div className="flex flex-col items-center mt-10">
        Invalid session! login again or try to create a clip
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Here are some clips from the community below
      </h1>
      <HighlightedCode response={response} />
    </div>
  );
};

export default Page;
