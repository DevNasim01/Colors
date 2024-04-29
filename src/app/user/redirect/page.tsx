"use client"
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import randomcolor from "randomcolor";

const Redirect = () => {
  const router = useRouter();

  const setRandomColor = randomcolor({
    hue: "ramdom",
    luminosity: "random",
    count: 5,
  })

  const routeParam = setRandomColor?.map((color: string) => color.slice(1)).join("-");

  console.log(routeParam)
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(`/user/colors/${encodeURI(routeParam)}`);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []); 

  return <Loading />;
};

export default Redirect;
