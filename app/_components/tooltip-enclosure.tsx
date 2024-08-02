import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const TooltipEnclosure = ({ content, children }: any) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span>{children}</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-primary text-white px-2 py-1 rounded text-xs"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-primary" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipEnclosure;
