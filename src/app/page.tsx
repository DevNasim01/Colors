import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();

  return (
    <>
      <div className="h-full w-full lg:flex grid place-items-center">
        <div className="w-full h-full flex flex-col items-center gap-[1vw] justify-center relative">
          {user && (
            <span className="text-xl font-semibold capitalize text-center grid place-content-start lg:absolute top-3 left-[3vw]">
              Hi&#39; {user?.firstName}
            </span>
          )}

          <h1 className="text-4xl sm:text-7xl w-9/12 lg:w-1/2 lg:text-[5.2vw]/[5.5vw] font-extrabold tracking-tighter text-center">
            The super fast color palettes generator!
          </h1>
          <p className="text-base sm:text-xl lg:text-[1.3vw] w-2/3 font-medium text-center mt-5 mb-5 lg:mb-0">
            Create the prefect palette or get inspired by thousnands of
            beautiful color schemes.
          </p>
          {user ? (
            <Link href={"/user/colors"}>
              <Button className="duration-300 bg-blue-600 hover:bg-blue-700 px-5 py-4 ">
                Generate your colors
              </Button>
            </Link>
          ) : (
            <SignInButton>
              <Button className="duration-300 bg-blue-600 hover:bg-blue-700 px-5 py-4">
                Signin to use generator!
              </Button>
            </SignInButton>
          )}
          <Button variant="outline" className="border-2 duration-300 px-5 py-4 mt-2 lg:mt-0">
            Explore trending palettes
          </Button>
        </div>

        <div className="w-full h-full flex justify-center items-start pt-5 md:pt-0 lg:items-center">
          <div className="w-[85%]">
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

export default page;
