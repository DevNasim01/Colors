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
  const [lockColor, setLockColor] = useState<string[]>(() => {
    const storedLockColor = localStorage.getItem("lockColor");
    return storedLockColor ? JSON.parse(storedLockColor) : [];
  });
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('lockColor', JSON.stringify(lockColor));
    }, 150); // Adjust the debounce time as needed
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [lockColor]);
  

  // useEffect(() => {
  //   // Load lockColor from localStorage on component mount
  //   const storedLockColor = localStorage.getItem("lockColor");
  //   if (storedLockColor) {
  //     setLockColor(JSON.parse(storedLockColor));
  //   }
  // }, []);

  // console.log(lockColor)


  // console.log(colorPalettes);
  const runFunction = () => {
    const randomColors = Array.from({ length: 5 }, () =>
      randomColor({
        hue: "random",
        luminosity: "random",
      })
    );

    const allColors = [...lockColor, ...randomColors];

    console.log(allColors, "all colors");

    if (allColors.length >= 5) {
      const routeParam = allColors
        .slice(0, 5)
        .map((color) => color.replace("#", ""))
        .join("-");
    router.replace(`/user/colors/${encodeURI(routeParam)}`);
  };
}

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
            lockColor={lockColor}
            setLockColor={setLockColor}
          />
        ))}
      </Reorder.Group>
    </main>
  );
};

export default Page;
