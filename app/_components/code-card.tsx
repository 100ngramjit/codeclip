"use client";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  nightOwl,
  googlecode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyButton } from "./copy-button";
import MacWindow from "./mac-window";
import DeleteDialog from "./delete-dialog";
import EditDialog from "./edit-dialog";
import SaveButton from "./save-button";
import TooltipEnclosure from "./tooltip-enclosure";

const CodeCard = ({
  clip,
  isEditEnabled,
  isDetailsCard = false,
  showTitle = true,
}: any) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const clipURL = `${process.env.NEXT_PUBLIC_HOST}/feed/clip/${clip.id}`;

  const formattedCreationTime = formatDistanceToNow(new Date(clip.createdAt), {
    addSuffix: true,
  });

  return (
    <Card key={clip.id} className="p-4 sm:p-4 my-4 rounded-lg w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 overflow-auto">
        <div className="sm:flex sm:justify-start sm:align-top gap-2">
          <div>
            {showTitle && (
              <Link
                href={clipURL}
                className="text-base mb-1 sm:mb-0 break-all hover:underline text-primary"
              >
                {clip.fileName}
              </Link>
            )}
          </div>
          <div>
            <CopyButton text={clip.code} />
            <MacWindow title={clip.fileName} code={clip.code} />
            <TooltipEnclosure content="share">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 cursor pointer  "
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-xl">
                    <DrawerHeader>
                      <DrawerTitle className="flex justify-start gap-2">
                        <div>Share Snippet Url</div>

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
            </TooltipEnclosure>
            {user?.id && isDetailsCard && <SaveButton clip={clip} />}

            {isEditEnabled && user?.id === clip.clerkUserId && (
              <>
                <EditDialog
                  clip={clip}
                  isOpen={isEditDialogOpen}
                  setIsOpen={setIsEditDialogOpen}
                />
                <DeleteDialog
                  clip={clip}
                  isOpen={isDeleteDialogOpen}
                  setIsOpen={setIsDeleteDialogOpen}
                />
              </>
            )}
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">by {clip?.userEmail}</p>
        </div>
      </div>
      <div className="hidden md:flex w-full">
        <SyntaxHighlighter
          style={theme === "dark" ? nightOwl : googlecode}
          showLineNumbers
          wrapLines
          customStyle={{
            fontSize: "0.8rem",
            width: "100%",
            overflowX: isHovered ? "auto" : "hidden",
            transition: "overflow-x 0.3s ease",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {clip.code}
        </SyntaxHighlighter>
      </div>
      <div className="md:hidden w-full overflow-x-auto">
        <SyntaxHighlighter
          style={theme === "dark" ? nightOwl : googlecode}
          showLineNumbers
          wrapLines
          customStyle={{
            fontSize: "0.7rem",
            width: "100%",
            overflowX: "auto",
            padding: "1rem",
          }}
        >
          {clip.code}
        </SyntaxHighlighter>
      </div>
      <p className="text-muted-foreground text-xs opacity-60 py-1">
        {formattedCreationTime}
      </p>
    </Card>
  );
};

export default CodeCard;
