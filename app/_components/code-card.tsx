"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  nightOwl,
  googlecode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyButton } from "./copy-button";
import { useTheme } from "next-themes";
import MacWindow from "./mac-window";
import { Share2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";

const CodeCard = ({ clip, isEditEnabled }: any) => {
  const { user } = useUser();
  const { theme } = useTheme();
  const [editedTitle, setEditedTitle] = useState(clip.fileName);
  const [editedCode, setEditedCode] = useState(clip.code);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const clipURL = `${process.env.NEXT_PUBLIC_HOST}/dashboard/clip/${clip.id}`;

  const handleEdit = async () => {
    try {
      let bodyContent = JSON.stringify({
        clipId: clip.id,
        userId: user?.id,
        title: editedTitle,
        content: editedCode,
      });
      let reqOptions = {
        url: "api/editclip",
        method: "PUT",
        data: bodyContent,
      };

      let response = await axiosInstance.request(reqOptions);

      if (!response.data) {
        throw new Error("Failed to edit clip");
      }

      const updatedClip = await response.data;

      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Your clip has been updated.",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error editing clip:", error);
      toast({
        title: "Error",
        description: "Failed to update the clip. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card key={clip.id} className="p-4 sm:p-4 my-2 rounded-lg w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 overflow-auto">
        <div className="flex justify-start align-top gap-2">
          <Link
            href={clipURL}
            className="text-sm sm:text-base mb-1 sm:mb-0 break-all hover:underline"
          >
            {clip.fileName}
          </Link>
          <CopyButton text={clip.code} />
          <MacWindow title={clip.fileName} code={clip.code} />

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>
                    Share Snippet Url
                    <CopyButton text={clipURL} />
                  </DrawerTitle>
                  <DrawerDescription className="overflow-auto bg-accent">
                    {clipURL}
                  </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          {isEditEnabled && user?.id === clip.clerkUserId && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 cursor-pointer"
                >
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
                  <Button onClick={handleEdit}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm">
          by {clip?.userEmail}
        </p>
      </div>
      <div className="hidden md:flex w-full">
        <SyntaxHighlighter
          style={theme === "dark" ? nightOwl : googlecode}
          showLineNumbers
          wrapLines
          customStyle={{
            fontSize: "0.8rem",
            width: "100%",
          }}
        >
          {clip.code}
        </SyntaxHighlighter>
      </div>
      <div className="md:hidden w-full">
        <SyntaxHighlighter
          style={theme === "dark" ? nightOwl : googlecode}
          showLineNumbers
          wrapLines
          customStyle={{
            fontSize: "0.6rem",
            width: "100%",
          }}
        >
          {clip.code}
        </SyntaxHighlighter>
      </div>
    </Card>
  );
};

export default CodeCard;
