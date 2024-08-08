"use client";
import { CreateClipForm } from "@/app/_components/create-clip-form";
import { useAuth } from "@clerk/nextjs";

const Page: React.FC = () => {
  const { userId } = useAuth();
  return (
    <div className="flex flex-col items-center mt-5 m-2">
      <h1 className="text-4xl font-bold mb-3">Create a new clip</h1>
      <CreateClipForm />
    </div>
  );
};

export default Page;
