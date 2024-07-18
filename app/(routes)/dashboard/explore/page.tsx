import { currentUser } from "@clerk/nextjs/server";
import axiosInstance from "@/lib/axiosInstance";
import HighlightedCode from "@/app/_components/highlighted-code-group";
import { Suspense } from "react";
import SkeletonHighlightedCode from "@/app/_components/clips-skeleton";

const Page: React.FC = async () => {
  const user = await currentUser();
  console.log(user);

  let bodyContent = JSON.stringify({
    userId: user?.id,
  });

  let reqOptions = {
    url: "/api/randomclips",
    method: "POST",
    data: bodyContent,
  };

  let response = await axiosInstance.request(reqOptions);
  console.log(response.data);

  if (!response.data.length) {
    return (
      <div className="flex flex-col items-center mt-10">
        Invalid session! login again or try to create a clip
      </div>
    );
  }
  return (
    <Suspense fallback={<SkeletonHighlightedCode />}>
      <div className="flex flex-col items-center mt-10 px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
          Here are some clips from the community below
        </h1>
        <HighlightedCode response={response} />
      </div>
    </Suspense>
  );
};

export default Page;
