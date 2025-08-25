"use client";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { QRCodeSVG } from "qrcode.react";
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
import { Badge } from "@/components/ui/badge";
import { reverseMapLanguage } from "@/lib/langDetector";

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

  const clipURL = `${process.env.NEXT_PUBLIC_HOST}/dashboard/clip/${clip.id}`;

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
                className="text-md mb-1 sm:mb-0 break-all hover:underline text-primary"
              >
                {clip.fileName}
              </Link>
            )}
          </div>
          {clip.lang && (
            <Badge variant="secondary" className="text-xs ">
              {reverseMapLanguage(clip.lang)}
            </Badge>
          )}
          <div>
            <CopyButton text={clip.code} />
            <MacWindow
              title={clip.fileName}
              code={clip.code}
              lang={clip.lang}
              userEmail={clip?.userEmail}
            />
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
                      <DrawerTitle className="flex justify-center gap-2">
                        <div className="text-xl md:text-2xl">
                          Share Snippet URL
                        </div>

                        <CopyButton
                          text={clipURL}
                          className="w-6 h-6 md:h-8 md:w-8 my-auto"
                        />
                      </DrawerTitle>
                      <div className="overflow-auto">
                        <div className="flex justify-center rounded-lg mb-4 w-full mx-auto">
                          <QRCodeSVG
                            value={clipURL}
                            width="65%"
                            height="65%"
                            level={"H"}
                            bgColor={theme === "light" ? "#e5fffb" : "#061311"}
                            fgColor={theme === "light" ? "#000000" : "#ffffff"}
                          />
                        </div>
                        <div className="bg-accent text-muted-foreground">
                          {clipURL}
                        </div>
                      </div>
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

            {isEditEnabled &&
              user?.primaryEmailAddress?.emailAddress === clip.userEmail && (
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
          language={clip.lang}
          showLineNumbers
          wrapLines
          customStyle={{
            fontSize: `${isDetailsCard ? "1.2rem" : "0.8rem"}`,
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
          language={clip.lang}
          style={theme === "dark" ? nightOwl : googlecode}
          showLineNumbers
          wrapLines
          customStyle={{
            fontSize: "0.6rem",
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
