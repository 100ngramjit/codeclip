import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
import { Card } from "@/components/ui/card";

const Page: React.FC = async () => {
  const user = await currentUser();
  console.log(user);

  let bodyContent = JSON.stringify({
    userId: user?.id,
  });

  let reqOptions = {
    url: "/api/userclips",
    method: "POST",
    data: bodyContent,
  };

  let response = await axiosInstance.request(reqOptions);
  console.log(response.data);

  if (!response.data.length) {
    return (
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold mb-6">Hi {user?.firstName}!</h1>
        <p>
          you dont have any clips yet! create a clip
          <span className="cursor-pointer font-bold border-b border-gray-800 dark:border-gray-500">
            <Link href="/dashboard/create">&nbsp;here</Link>
          </span>
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Hi {user?.firstName}! Here are your published clips below
      </h1>
      <div className="w-full max-w-3xl">
        {response.data.map(
          (clip: {
            id: Key | null | undefined;
            fileName:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            code: string | string[];
          }) => (
            <Card key={clip.id} className="bg-gray-800 p-2 my-2 rounded-lg">
              <p className="text-white mb-2">{clip.fileName}</p>
              <SyntaxHighlighter
                style={nightOwl}
                showLineNumbers
                wrapLongLines
                customStyle={{ fontSize: "0.9rem" }}
              >
                {clip.code}
              </SyntaxHighlighter>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
