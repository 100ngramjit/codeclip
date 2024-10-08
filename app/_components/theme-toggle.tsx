import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import TooltipEnclosure from "./tooltip-enclosure";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <TooltipEnclosure content="Toggle theme">
      <div
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="cursor-pointer"
      >
        <Sun className="h-5 w-5 sm:h-7 sm:w-7 dark:hidden" />
        <MoonStar className="hidden h-5 w-5 sm:h-7 sm:w-7 dark:block" />
        <span className="sr-only">Toggle theme</span>
      </div>
    </TooltipEnclosure>
  );
}
