"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { useTheme } from "next-themes";
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
import { Label } from "@/components/ui/label";
import { Edit2, Loader2 } from "lucide-react";
import TooltipEnclosure from "./tooltip-enclosure";

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
  const [isChanged, setIsChanged] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    setIsChanged(editedTitle !== clip.fileName || editedCode !== clip.code);
  }, [editedTitle, editedCode, clip.fileName, clip.code]);

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
    <TooltipEnclosure content="edit">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Edit clip</DialogTitle>
            <DialogDescription>
              Make changes to your clip here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-3">
              <Label htmlFor="title" className="text-left sm:text-center">
                Title
              </Label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="col-span-5"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-3">
              <Label htmlFor="code" className="text-left sm:text-center">
                Code
              </Label>
              <div className="col-span-5 overflow-y-auto max-h-[50vh]">
                <CodeMirror
                  value={editedCode}
                  height="100%"
                  theme={theme === "dark" ? vscodeDark : vscodeLight}
                  onChange={(value) => setEditedCode(value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEdit} disabled={isLoading || !isChanged}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipEnclosure>
  );
};

export default EditDialog;
