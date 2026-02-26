"use client";
import { useState } from "react";
import { BookmarkCheck, BookmarkPlus, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import TooltipEnclosure from "./tooltip-enclosure";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const SaveButton = ({ clip, isMenuItem = false }: any) => {
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(clip.isSaved);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const bodyContent = JSON.stringify({
        clipId: clip.id,
        userId: user?.id,
      });

      const reqOptions = {
        url: "api/saved",
        method: `${isSaved ? "DELETE" : "POST"}`,
        data: bodyContent,
      };

      const response = await axiosInstance.request(reqOptions);
      setIsSaved(!isSaved);

      if (!response.data) {
        throw new Error("Failed to update saved status");
      }
      setIsLoading(false);
      toast({
        description: `This clip is ${!isSaved ? "saved" : "unsaved"}!`,
      });
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting clip:", error);
      toast({
        title: "Error",
        description: "Failed to delete the clip. Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveButtonHandler = async () => {
    await handleSave();
  };
  return isMenuItem ? (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        saveButtonHandler();
      }}
      className="cursor-pointer"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : isSaved ? (
        <BookmarkCheck className="w-4 h-4 mr-2" />
      ) : (
        <BookmarkPlus className="w-4 h-4 mr-2" />
      )}
      {isSaved ? "Unsave" : "Save"}
    </DropdownMenuItem>
  ) : (
    <TooltipEnclosure content={`${isSaved ? "unsave" : "save"} `}>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 cursor-pointer"
        aria-label="save"
        onClick={saveButtonHandler}
      >
        {isLoading == false && isSaved == true && (
          <BookmarkCheck className="w-4 h-4" />
        )}
        {isLoading == false && isSaved == false && (
          <BookmarkPlus className="w-4 h-4" />
        )}
        {isLoading == true && <Loader2 className="w-4 h-4 animate-spin" />}
      </Button>
    </TooltipEnclosure>
  );
};
export default SaveButton;
