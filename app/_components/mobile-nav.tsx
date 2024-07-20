import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { PanelRightOpen } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-7 w-7 sm:h-9 sm:w-9">
          <PanelRightOpen className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 sm:gap-6 p-2">
          <SheetClose asChild>
            <Link href="/dashboard" className="text-sm sm:text-base">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/dashboard/explore" className="text-sm sm:text-base">
              Explore
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/dashboard/create" className="text-sm sm:text-base">
              Create
            </Link>
          </SheetClose>
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
