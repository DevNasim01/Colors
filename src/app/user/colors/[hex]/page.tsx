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
  const [draggable, setDraggable] = useState<boolean>(false);
  const parent = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [lockColor, setLockColor] = useState<string[]>(() => {
    const storedLockColor = localStorage.getItem("lockColor");
    return storedLockColor ? JSON.parse(storedLockColor) : [];
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("lockColor", JSON.stringify(lockColor));
    }, 200); // Adjust the debounce time as needed

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lockColor]);

  const runFunction = () => {
    const randomColors = Array.from({ length: 5 }, () =>
      randomColor({
        hue: "random",
        luminosity: "random",
      })
    );

    const allColors = [...lockColor, ...randomColors];

    // console.log(allColors, "all colors");

    if (allColors.length >= 5) {
      const routeParam = allColors
        .slice(0, 5)
        .map((color) => color.replace("#", ""))
        .join("-");
      router.replace(`/user/colors/${encodeURI(routeParam)}`);

      return allColors;
    }
  };

  return (
    <main className={`w-full h-full relative ${!isDesktop && "min-h-full"}`}>
      <NavBar runFunction={runFunction} />
      <Reorder.Group
        className="w-full h-dvh md:h-full flex flex-col md:flex-row"
        axis={isDesktop ? "x" : "y"}
        values={colorPalettes}
        onReorder={setColorPalattes}
        ref={parent}
      >
        {colorPalettes.map((color: string, index: number) => (
          <Reorder.Item
            key={color}
            value={color}
            dragListener={draggable}
            onDragEnd={() => setDraggable(false)}
            className="w-full h-full"
          >
            <Pallate
              color={color}
              runFunction={runFunction}
              lockColor={lockColor}
              setLockColor={setLockColor}
              setDraggable={setDraggable}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </main>
  );
};

export default Page;
