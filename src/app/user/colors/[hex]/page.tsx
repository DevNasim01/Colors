"use client";
import NavBar from "@/components/nav";
import Pallate from "@/components/pallate";
import { useMediaQuery } from "@react-hook/media-query";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";
import React, { useEffect, useRef, useState } from "react";

const Page = ({
  params,
}: {
  params: {
    hex: string;
  };
}) => {
  const hex = params.hex;
  const colors: undefined | string[] | any = hex && hex.split("-");
  const [colorPalettes, setColorPalattes] = useState(colors);
  const parent = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [lockColor, setLockColor] = useState<string[]>([]);

  useEffect(() => {
    // Load lockColor from localStorage on component mount
    const storedLockColor = localStorage.getItem("lockColor");
    if (storedLockColor) {
      setLockColor(JSON.parse(storedLockColor));
    }
  }, []);

  const handelLockColor = (newColors: string[]) => {
    // Merge the new colors with the existing lockColor array
    const updatedColors = [...lockColor, ...newColors];
    setLockColor(updatedColors);
    // Save updated lockColor to localStorage
    localStorage.setItem("lockColor", JSON.stringify(updatedColors));
  };

  // console.log(colorPalettes);
  const runFunction = () => {
    const maxCount = 5;
    const newColorCount = Math.max(0, maxCount - lockColor.length);
    const newColor = randomColor({
      hue: "random",
      luminosity: "random",
      count: newColorCount, // Generate one random color
    });
    const routeParam = [...lockColor, ...newColor]
      ?.map((color: string) => color.slice(1))
      .join("-");
    router.replace(`/user/colors/${encodeURI(routeParam)}`);
  };

  return (
    <main className={`w-full h-full relative ${!isDesktop && "min-h-full"}`}>
      <NavBar runFunction={runFunction} />
      <Reorder.Group
        className="w-full h-full grid grid-rows-5 md:flex"
        axis={isDesktop ? "x" : "y"}
        values={colorPalettes}
        onReorder={setColorPalattes}
        ref={parent}
      >
        {colorPalettes.map((color: string, index: number) => (
          <Pallate
            key={index}
            color={color}
            parent={parent}
            runFunction={runFunction}
            handelLockColor={handelLockColor}
          />
        ))}
      </Reorder.Group>
    </main>
  );
};

export default Page;
