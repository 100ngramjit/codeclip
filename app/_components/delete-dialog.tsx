"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import TooltipEnclosure from "./tooltip-enclosure";

const DeleteDialog = ({
  clip,
  isOpen,
  setIsOpen,
}: {
  clip: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const bodyContent = JSON.stringify({
        clipId: clip.id,
      });

      const reqOptions = {
        url: "api/editclip",
        method: "DELETE",
        data: bodyContent,
      };

      const response = await axiosInstance.request(reqOptions);

      if (!response.data) {
        throw new Error("Failed to delete clip");
      }
      setIsLoading(false);
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Your clip has been deleted.",
      });
      router.refresh();
      router.push("/feed");
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

  return (
    <TooltipEnclosure content="delete">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 cursor pointer  "
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete clip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this clip? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipEnclosure>
  );
};

export default DeleteDialog;
