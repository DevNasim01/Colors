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
import { color } from "framer-motion";
import { toast } from "./ui/use-toast";
export default function Options({
  textColor,
  currectColor,
  setDraggable,
}: {
  textColor: string;
  currectColor: string;
  setDraggable: (value: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { hex } = useParams<{ hex: string }>();

  // console.log(currectColor)

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
    console.log(newHex);
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
      <div className="flex flex-col gap-3 md:gap-5">
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
              <PopoverContent side="left" style={{ width: "20%" }}>
                <span>Cut</span>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <CopyIcon currentColor={textColor} />
              </PopoverTrigger>
              <PopoverContent side="left">
                <span onClick={() => console.log("clickedddd")}>Copy</span>
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
