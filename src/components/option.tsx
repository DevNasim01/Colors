import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  CopyIcon,
  LockIcon,
  CancelIcon,
  DragIcon,
  OpenIcon,
} from "@/components/icons (1)";
export default function Options({ textColor }: { textColor: string }) {
  return (
    <>
      <div className="flex flex-col gap-3 md:gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CancelIcon currentColor={textColor} />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Cut</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <CopyIcon currentColor={textColor} />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <DragIcon currentColor={textColor} />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Drag</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <LockIcon currentColor={textColor} />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Lock</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
