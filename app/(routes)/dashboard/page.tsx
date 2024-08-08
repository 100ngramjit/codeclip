"use client";

import { useUser } from "@clerk/nextjs";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import SkeletonHighlightedCode from "@/app/_components/clips-skeleton";
import Link from "next/link";
import HighlightedCodeList from "@/app/_components/highlighted-code-group";

const Page: React.FC = () => {
  const { user } = useUser();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        let bodyContent = JSON.stringify({
          userId: user.id,
        });

        let reqOptions = {
          url: "/api/userclips",
          method: "POST",
          data: bodyContent,
        };

        try {
          const result = await axiosInstance.request(reqOptions);
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
    return (
      <div className="flex flex-col items-center mt-5 mx-auto p-4">
        <SkeletonHighlightedCode />
      </div>
    );
  }

  if (!response || !response.data.length) {
    return (
      <div className="flex flex-col items-center mt-5 px-4">
        <p>
          Hi {user?.firstName}! you don't have any published clips yet. Start
          creating
          <Link
            href="/dashboard/create"
            className="px-1 text-primary hover:underline"
          >
            here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-5 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-3 text-center">
        Hi {user?.firstName}! Here are your published clips below
      </h1>
      <HighlightedCodeList response={response} />
    </div>
  );
};

export default Page;
