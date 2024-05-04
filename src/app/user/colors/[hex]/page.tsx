"use client"
import Pallate from "@/components/pallate";
import { useMediaQuery } from "@react-hook/media-query";
import { Reorder } from "framer-motion";
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

  // console.log(colors);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
      <Reorder.Group
      className="w-full h-full grid grid-rows-5 md:flex"
      axis={isDesktop ? 'x' : 'y'}
      values={colorPalettes}
      onReorder={setColorPalattes}
      ref={parent}
    >
      {colors.map((color: string, index: number) => (
        <Pallate key={index} color={color} parent={parent} />
      ))}
    </Reorder.Group>
  );
};

export default Page;
