"use client"
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion, useAnimate } from "framer-motion";
import { BLUR_BUTTON_VARIANT, FADE_DOWN_ANIMATION_VARIANTS } from "@/variant";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const [scope, animate] = useAnimate();

  const getRandomColor = () => {
    // Generate a random hexadecimal color
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const animateWithRandomColors = async (target: string) => {
    while (true) {
      const color = getRandomColor(); // Generate a random color
      if (scope.current){
        await animate(
          target,
          {
            fill: color,
          },
          {
            duration: 0.3,
            delay: 0.4,
          }
        );
      } else {
        break;
      }
    }
  };

  useEffect(() => {
    animateWithRandomColors(".first");
    animateWithRandomColors(".second");
    animateWithRandomColors(".third");
    animateWithRandomColors(".fourth");
    animateWithRandomColors(".fifth");
  }, [animateWithRandomColors]);

  return (
    <>
      <div className="h-full w-full lg:flex grid place-items-center">
        <motion.div className="w-full h-full flex flex-col items-center gap-[1vw] justify-center relative"
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        >
          {user && (
            <span className="text-xl font-semibold capitalize text-center grid place-content-start items-center lg:absolute top-3 left-[3vw] font-mono">
              Hi&#39; {user?.firstName}
            </span>
          )}

          <motion.h1
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="text-4xl sm:text-7xl w-9/12 lg:w-1/2 lg:text-[5.2vw]/[5.5vw] font-extrabold tracking-tighter text-center"
          >
            The super fast color palettes generator!
          </motion.h1>
          <motion.p
          variants={FADE_DOWN_ANIMATION_VARIANTS} 
          className="text-base sm:text-xl lg:text-[1.3vw] w-2/3 font-medium text-center mt-5 mb-5 lg:mb-0">
            Create the prefect palette or get inspired by thousnands of
            beautiful color schemes.
          </motion.p>
          {user ? (
            <Link href={"/user/redirect"}>
              <motion.span
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, delay: 0.5 }}
              variants={BLUR_BUTTON_VARIANT}
              >
              <Button className="duration-300 bg-blue-600 hover:bg-blue-700 px-5 py-4 ">
                Generate your colors
              </Button>
              </motion.span>
            </Link>
          ) : (
            <SignInButton>
              <motion.span
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, delay: 0.5 }}
              variants={BLUR_BUTTON_VARIANT}
              >
              <Button className="duration-300 bg-blue-600 hover:bg-blue-700 px-5 py-4">
                Signin to use generator!
              </Button>
              </motion.span>
            </SignInButton>
          )}
          <motion.span 
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.8 }}
          variants={BLUR_BUTTON_VARIANT}
          >
          <Button variant="outline" className="border-2 duration-300 px-5 py-4 mt-2 lg:mt-0">
            Explore trending palettes
          </Button>
          </motion.span>
        </motion.div>

        <div className="w-full h-full flex justify-center items-start pt-5 md:pt-0 lg:items-center">
          <div className="w-[85%]" ref={scope} >
          <svg
            version="1.1"
            id="homepage_hero_image-mobile"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 498.94 301.86"
            xmlSpace="preserve"
          >
            <path d="M450.79,288.72V20.22c0.1-7.6-6.1-13.9-13.8-14c0,0,0,0-0.1,0H59.59c-7.7,0.1-13.9,6.3-13.9,13.9c0,0,0,0,0,0.1v268.5 H450.79z"></path>
            <g id="homepage_hero-generator-laptop-mobile">
              <path
                className="first"
                d="M324.79,16.12h112c2.2,0,4,1.8,4,4v255h-116V16.12z"
              ></path>
              <rect
                x="249.79"
                y="16.12"
                fill="yellow"
                className="second"
                width="115"
                height="259"
              ></rect>
              <rect
                x="171.79"
                y="16.12"
                fill="pink"
                className=" third"
                width="115"
                height="259"
              ></rect>
              <rect
                x="94.79"
                y="16.12"
                className=" fourth"
                width="116"
                height="259"
              ></rect>
              <path
                fill="purple"
                className=" fifth"
                d="M59.79,16.12h74v259h-78v-255C55.79,17.92,57.59,16.12,59.79,16.12z"
              ></path>
            </g>
            <path
              fill="#c9c8cc"
              d="M9.79,285.22h480l0,0c0,5.5-4.5,10-10,10h-460C14.29,295.22,9.79,290.72,9.79,285.22L9.79,285.22z"
            ></path>
          </svg>
          </div>
        </div>
      </div>
    </>
  );
};
