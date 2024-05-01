"use client";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import Options from "./option";
import { motion } from "framer-motion";
import { columVariant, columnChildVariant } from "@/variant";
import { handelTextColor } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "./ui/use-toast";
import { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useMediaQuery } from "@react-hook/media-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

extend([namesPlugin]);
export default function Pallate({ color }: { color: string }) {
  const AvoveMedium = useMediaQuery("only screen and (min-width: 768pxpx)");

  const { toast } = useToast();
  const [clicks, setClicks] = useState([false, false, false]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const hex = `#${color}`;
  const getColorName = (hex: string) => {
    return colord(hex).toName({ closest: true });
  };
  // console.log(typeof(hex))

  const textColor = handelTextColor(hex);

  // console.log(textColor)
  const colorName = getColorName(hex);
  const rgb = colord(hex).toRgbString();
  const rgba = colord(hex).grayscale().alpha(0.25).toRgbString();

  const handleClick = (index: number) => {
    toast({
      title: "Alert",
      description: "Color copied to Clipboard",
    });
    const newClicks = Array(3).fill(false);
    newClicks[index] = true;
    setClicks(newClicks);

    // Clear previous setTimeout
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Set new setTimeout
    timeoutId.current = setTimeout(() => {
      setClicks(Array(3).fill(false));
    }, 2000);
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <motion.div
      initial={"start"}
      whileHover={"show"}
      variants={columVariant}
      className={`relative w-full h-full text-xl font-semibold flex justify-between md:justify-center px-5 items-center md:items-end mb-10  `}
      style={{ backgroundColor: `${hex}`, color: `${textColor}` }}
    >
      <div className="text-left md:text-center md:mb-10 text-2xl md:text-3xl font-semibold">
        {AvoveMedium ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <h3>
                  {hex}
                  {isDesktop ? "true" : "flase"}
                </h3>
                <p className="text-sm capitalize">{colorName}</p>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex gap-2">
                  <CopyToClipboard text={hex} onCopy={() => handleClick(0)}>
                    <span
                      className={`bg-slate-200 text-sm rounded-md px-2 py-2 shadow-inner cursor-pointer ${
                        clicks[0] ? "active" : ""
                      }`}
                    >
                      {!clicks[0] ? hex : "✅"}
                    </span>
                  </CopyToClipboard>
                  <CopyToClipboard text={rgb} onCopy={() => handleClick(1)}>
                    <span
                      className={`bg-slate-200 text-sm rounded-md px-2 py-2 shadow-inner cursor-pointer ${
                        clicks[1] ? "active" : ""
                      }`}
                    >
                      {!clicks[1] ? rgb : "✅"}
                    </span>
                  </CopyToClipboard>
                  <CopyToClipboard text={rgba} onCopy={() => handleClick(2)}>
                    <span
                      className={`bg-slate-200 text-sm rounded-md px-2 py-2 shadow-inner cursor-pointer ${
                        clicks[2] ? "active" : ""
                      }`}
                    >
                      {!clicks[2] ? rgba : "✅"}
                    </span>
                  </CopyToClipboard>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Popover>
            <PopoverTrigger>
              <h3>
                {hex}
                {isDesktop ? "true" : "flase"}
              </h3>
              <p className="text-sm capitalize">{colorName}</p>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2">
                <CopyToClipboard text={hex} onCopy={() => handleClick(0)}>
                  <span
                    className={`bg-slate-200 text-sm rounded-md px-2 py-2 shadow-inner cursor-pointer ${
                      clicks[0] ? "active" : ""
                    }`}
                  >
                    {!clicks[0] ? hex : "✅"}
                  </span>
                </CopyToClipboard>
                <CopyToClipboard text={rgb} onCopy={() => handleClick(1)}>
                  <span
                    className={`bg-slate-200 text-sm rounded-md px-2 py-2 shadow-inner cursor-pointer ${
                      clicks[1] ? "active" : ""
                    }`}
                  >
                    {!clicks[1] ? rgb : "✅"}
                  </span>
                </CopyToClipboard>
                <CopyToClipboard text={rgba} onCopy={() => handleClick(2)}>
                  <span
                    className={`bg-slate-200 text-sm rounded-md px-2 py-2 shadow-inner cursor-pointer ${
                      clicks[2] ? "active" : ""
                    }`}
                  >
                    {!clicks[2] ? rgba : "✅"}
                  </span>
                </CopyToClipboard>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="md:absolute md:h-full flex items-center">
        <motion.span className="hidden md:block" variants={columnChildVariant}>
          <Options textColor={textColor} />
        </motion.span>
        <span className="md:hidden">
          <Options textColor={textColor} />
        </span>
      </div>
    </motion.div>
  );
}