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
import { useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactGPicker from "react-gcolor-picker";
import { useParams, useRouter } from "next/navigation";

extend([namesPlugin]);

let gColor: string;
export default function Pallate({
  color,
  runFunction,
  lockColor,
  setLockColor,
  setDraggable,
}: {
  color: string;
  runFunction: () => void;
  lockColor: string[];
  setLockColor: (value: string[]) => void;
  setDraggable: (value: boolean) => void;
}) {
  const [pallateColor, setPalleteColor] = useState<string>(`#${color}`);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const { hex } = useParams<{ hex: string }>();
  let router = useRouter();

  // handelLockhex
  const handleToggleHex = (hex: string) => {
    if (lockColor.includes(hex)) {
      // If the hex is already locked, unlock it
      setLockColor(lockColor.filter((h) => h !== hex));
    } else {
      // Otherwise, lock it
      setLockColor([...lockColor, hex]);
    }
  };

  const getColorName = (hex: string) => {
    return colord(hex).toName({ closest: true });
  };

  const textColor = handelTextColor(pallateColor);
  const colorName = getColorName(pallateColor);

  // generate new random color
  const handleKeyPress = (event: any) => {
    if (event.code === "Space") {
      // Run the function here
      runFunction();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });


  const newRoute = () => {
    router.replace(
      `/user/colors/${encodeURI(hex.replace(color, pallateColor.replace("#", "")))}`
    );
  };

  useEffect(() => {
    if (!isPopoverOpen) {
      newRoute();
    }
  }, [isPopoverOpen]);

  
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <motion.div
      initial={"start"}
      whileHover={"show"}
      variants={columVariant}
      className={`relative w-full h-40 md:h-full text-xl font-semibold flex justify-between md:justify-center px-5 md:px-0 items-center md:items-end`}
      style={{ backgroundColor: `${pallateColor}`, color: `${textColor}` }}
    >
      <div className="text-left md:text-center md:mb-10 text-2xl md:text-3xl font-semibold">
        <TooltipProvider>
          <Tooltip>
            <Popover 
            open={isPopoverOpen}
            onOpenChange={(open) => setIsPopoverOpen(open)}
            >
              <TooltipTrigger className="cursor-pointer px-3 py-1.5 rounded-md">
                <PopoverTrigger>
                  <h3 className="uppercase text-left md:text-center">{pallateColor.replace("#","")}</h3>
                  <p className="text-xs font-light opacity-70 lowercase  text-left md:text-center">
                    ~{colorName}
                  </p>
                </PopoverTrigger>
              </TooltipTrigger>
              {isDesktop && <TooltipContent>
                <h5 className="capitalize">Select Color</h5>
              </TooltipContent>}
              <PopoverContent className=" bg-transparent border-0 shadow-none">
                <ReactGPicker
                  value={pallateColor}
                  format="hex"
                  onChange={(value) => setPalleteColor(value)}
                />
              </PopoverContent>
            </Popover>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="md:absolute md:h-full flex items-center">
        <motion.span className="hidden md:block" variants={columnChildVariant}>
          <Options
            textColor={textColor}
            currectColor={pallateColor.replace('#','')}
            setDraggable={setDraggable}
            toogleHex={handleToggleHex}
            lockedHexes={lockColor}
          />
        </motion.span>
        <span className="md:hidden">
          <Options
            textColor={textColor}
            currectColor={pallateColor.replace('#','')}
            setDraggable={setDraggable}
            toogleHex={handleToggleHex}
            lockedHexes={lockColor}
          />
        </span>
      </div>
    </motion.div>
  );
}
