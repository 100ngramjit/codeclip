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
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-7 w-7 ">
          <PanelRightOpen className="w-3 h-3 " />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 sm:gap-6 p-2">
          <SheetClose asChild>
            <Link
              href="/dashboard"
              className={`text-sm sm:text-base ${
                pathname === "/dashboard" ? "font-bold text-primary" : ""
              }`}
            >
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/dashboard/explore"
              className={`text-sm sm:text-base ${
                pathname === "/dashboard/explore"
                  ? "font-bold text-primary"
                  : ""
              }`}
            >
              Explore
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/dashboard/create"
              className={`text-sm sm:text-base ${
                pathname === "/dashboard/create" ? "font-bold text-primary" : ""
              }`}
            >
              Create
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/dashboard/saved"
              className={`text-sm ${
                pathname === "/dashboard/saved" ? "font-bold text-primary" : ""
              }`}
            >
              Saved
            </Link>
          </SheetClose>
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
