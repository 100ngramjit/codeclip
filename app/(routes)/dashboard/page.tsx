"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-6">Hi {user?.firstName}!</h1>
      <p>
        you dont have any clips yet! create a clip
        <span
          className="cursor-pointer font-bold border-b border-gray-800 dark:border-gray-500"
          onClick={() => router.push("/dashboard/create")}
        >
          &nbsp;here
        </span>
      </p>
    </div>
  );
};

export default Page;
