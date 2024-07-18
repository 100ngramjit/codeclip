"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { LoaderButton } from "@/components/ui/loader-button";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  content: z
    .string()
    .min(8, { message: "Content must be at least 8 characters long" }),
});

type FormData = z.infer<typeof schema>;

export const CreateClipForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      console.log("host", process.env.HOST);
      let bodyContent = JSON.stringify({
        title: data.title,
        content: data.content,
        userId: user?.id,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      let reqOptions = {
        url: "api/create",
        method: "POST",
        data: bodyContent,
      };

      let response = await axiosInstance.request(reqOptions);
      toast({
        title: "Clip Published !",
      });
      setIsLoading(false);
      router.refresh();
      router.push("/dashboard");
    } catch (e: any) {
      console.log("error", e);
      toast({
        title: JSON.stringify(e),
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="mb-4">
        <Input
          placeholder="Clip Title"
          {...register("title")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Textarea
          placeholder="Clip Content"
          {...register("content")}
          className="w-full p-2 border border-gray-300 rounded"
          rows={10}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>
      <LoaderButton type="submit" isLoading={isLoading}>
        Publish Clip
      </LoaderButton>
    </form>
  );
};
