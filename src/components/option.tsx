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
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useState } from "react";
export default function Options({
  textColor,
  currectColor,
  setDraggable,
  toogleHex,
  lockedHexes,
}: {
  textColor: string;
  currectColor: string;
  setDraggable: (value: boolean) => void;
  toogleHex: (color: string) => void;
  lockedHexes: string[];
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { hex } = useParams<{ hex: string }>();
  const [lock, setLock] = useState(false);


  // remove color
  const removeColor = (selectedColor: string) => {
    const colors = hex.split("-");
    const updatedColors = colors.filter(
      (color: string) => color !== selectedColor
    );
    if (updatedColors.length === 0) {
      console.error("At least one color must be present.");
      return; // Exit the function without further processing
    }
    const newHex = updatedColors.join("-");
    router.replace(`/user/colors/${encodeURI(newHex)}`);
    // console.log(newHex);
  };

  // copy color
  const copyColor = (color: string) => {
    toast({
      title: `Alert - #${color}`,
      description: "Color copied to Clipboard",
    });
    navigator.clipboard.writeText("#" + color);
  };



  return (
    <>
      <div className="flex flex-col gap-3.5 md:gap-5">
        {isDesktop ? (
          <TooltipProvider>
            {hex.split("-").length > 2 && (
              <Tooltip>
                <TooltipTrigger onClick={() => removeColor(currectColor)}>
                  <CancelIcon currentColor={textColor} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Cut</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger onClick={() => copyColor(currectColor)}>
                <CopyIcon currentColor={textColor} />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>

            <div
              onMouseEnter={() => setDraggable(true)}
              onMouseLeave={() => setDraggable(false)} // retain this for better animation
              onTouchStart={() => setDraggable(true)}
            >
              <Tooltip>
                <TooltipTrigger>
                  <DragIcon currentColor={textColor} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Drag</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger onClick={() => toogleHex(currectColor)}>
              {lockedHexes?.includes(currectColor) ? (
                  <LockIcon currentColor={textColor} />
                ) : (
                  <OpenIcon currentColor={textColor} />
                )}
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Lock</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            <Popover>
              <PopoverTrigger onClick={() => copyColor(currectColor)}>
                <CopyIcon currentColor={textColor} />
              </PopoverTrigger>
              <PopoverContent side="left">
                <span>Copy</span>
              </PopoverContent>
            </Popover>

            <div 
            onMouseEnter={() => setDraggable(true)}
            onMouseLeave={() => setDraggable(false)} // retain this for better animation
            onTouchStart={() => setDraggable(true)} >
            <Popover>
              <PopoverTrigger>
                <DragIcon currentColor={textColor} />
              </PopoverTrigger>
              <PopoverContent side="left">
                <span>Drag</span>
              </PopoverContent>
            </Popover>
            </div>

            <Popover>
              <PopoverTrigger onClick={() => toogleHex(currectColor)}>
              {lockedHexes?.includes(currectColor) ? (
                  <LockIcon currentColor={textColor} />
                ) : (
                  <OpenIcon currentColor={textColor} />
                )}
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
