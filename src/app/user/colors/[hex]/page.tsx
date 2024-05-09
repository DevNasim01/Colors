"use client";
import NavBar from "@/components/nav";
import Pallate from "@/components/pallate";
import { useMediaQuery } from "@react-hook/media-query";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";
import React, { useRef, useState } from "react";

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
  // console.log(colors);
  const runFunction = () => {
    const newColor = randomColor({
      hue: "random",
      luminosity: "random",
      count: 5, // Generate one random color
    });
    const routeParam = newColor
      ?.map((color: string) => color.slice(1))
      .join("-");
    router.replace(`/user/colors/${encodeURI(routeParam)}`);
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <main className="w-full h-full relative">
      <NavBar runFunction={runFunction}/>
      <Reorder.Group
        className="w-full h-full grid grid-rows-5 md:flex"
        axis={isDesktop ? "x" : "y"}
        values={colorPalettes}
        onReorder={setColorPalattes}
        ref={parent}
      >
        {colors.map((color: string, index: number) => (
          <Pallate key={index} color={color} parent={parent} runFunction={runFunction} />
        ))}
      </Reorder.Group>
    </main>
  );
};

export default Page;
