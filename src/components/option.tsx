import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  CopyIcon,
  LockIcon,
  CancelIcon,
  DragIcon,
  OpenIcon,
} from "@/components/icons (1)";
import { useMediaQuery } from "@react-hook/media-query";
export default function Options({ textColor }: { textColor: string }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div className="flex flex-col gap-3 md:gap-5">
        {isDesktop ? (
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
        ) : (
          <>
            <Popover>
              <PopoverTrigger>
                <CancelIcon currentColor={textColor} />
              </PopoverTrigger>
              <PopoverContent side="left" style={{width: '20%'}}>
                <span>Cut</span>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <CopyIcon currentColor={textColor} />
              </PopoverTrigger>
              <PopoverContent side="left">
                <span>Copy</span>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <DragIcon currentColor={textColor} />
              </PopoverTrigger>
              <PopoverContent side="left">
                <span>Drag</span>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <LockIcon currentColor={textColor} />
              </PopoverTrigger>
              <PopoverContent side="left">
                <span>Lock</span>
              </PopoverContent>
            </Popover>
            </>
        )}
      </div>
    </>
  );
}
