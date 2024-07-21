"use client";
import { Card } from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  nightOwl,
  googlecode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyButton } from "./copy-button";
import { useTheme } from "next-themes";
import MacWindow from "./mac-window";
import { Share2 } from "lucide-react";
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

const CodeCard = ({ clip }: any) => {
  const { theme } = useTheme();

  return (
    <Card key={clip.id} className="p-4 sm:p-4 my-2 rounded-lg w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 overflow-auto">
        <div className="flex justify-start align-top gap-2">
          <p className="text-sm sm:text-base mb-1 sm:mb-0 break-all">
            {clip.fileName}
          </p>
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
                    <CopyButton
                      text={`${process.env.NEXT_PUBLIC_HOST}/dashboard/clip/${clip.id}`}
                    />
                  </DrawerTitle>
                  <DrawerDescription className="overflow-auto bg-accent">
                    {`${process.env.NEXT_PUBLIC_HOST}/dashboard/clip/${clip.id}`}
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
