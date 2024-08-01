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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { Edit2, Loader2 } from "lucide-react";

const EditDialog = ({
  clip,
  isOpen,
  setIsOpen,
}: {
  clip: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [editedTitle, setEditedTitle] = useState(clip.fileName);
  const [editedCode, setEditedCode] = useState(clip.code);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const bodyContent = JSON.stringify({
        clipId: clip.id,
        userId: clip.clerkUserId,
        title: editedTitle,
        content: editedCode,
      });

      const reqOptions = {
        url: "api/editclip",
        method: "PUT",
        data: bodyContent,
      };

      const response = await axiosInstance.request(reqOptions);

      if (!response.data) {
        throw new Error("Failed to edit clip");
      }

      const updatedClip = await response.data;
      setIsLoading(false);
      setIsOpen(false);

      toast({
        title: "Success",
        description: "Your clip has been updated.",
      });
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error("Error editing clip:", error);
      toast({
        title: "Error",
        description: "Failed to update the clip. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-6 w-6 cursor-pointer">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit clip</DialogTitle>
          <DialogDescription>
            Make changes to your clip here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Textarea
              id="code"
              value={editedCode}
              onChange={(e) => setEditedCode(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleEdit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;