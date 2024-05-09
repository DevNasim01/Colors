import { Button } from "./ui/button";
import Image from "next/image";

const NavBar = ({ runFunction }: { runFunction: () => void }) => {
  return (
    <>
      <nav className="w-full relative md:absolute top-0 left-0 px-2 md:px-5 lg:px-10 md:py-3 font-mono gap-2 z-50 flex items-center bg-[#F8F8FF]">
        <div className="hidden lg:block text-base opacity-75 w-11/12">
          Press Space bar to change color
        </div>
        <Button className="lg:hidden w-1/2" onClick={runFunction}>
          Generate
        </Button>

        <div className="md:flex hidden items-center gap-6">
          <Button variant="ghost" className="flex justify-center items-center px-7">
            <Image src="/eye-open.svg" alt="open" width={50} height={50} />
          </Button>

          <Button variant="ghost" className="flex justify-center items-center px-7">
            <Image src="/heart.svg" alt="heart" width={50} height={50} />
          </Button>

          <Button variant="ghost" className="flex justify-center items-center px-7">
            <Image src="/export.svg" alt="export" width={50} height={50} />
          </Button>

          <Button variant="ghost" className="flex justify-center items-center px-7">
            <Image src="/bar.svg" alt="bar" width={50} height={50} />
          </Button>
        </div>

        {/* Adjust size of buttons for large devices */}
        <div className="md:hidden flex items-center py-2 w-full justify-between">
          <Button variant="ghost" className="flex justify-center items-center px-4">
            <Image src="/eye-open.svg" alt="open" width={20} height={20} />
          </Button>

          <Button variant="ghost" className="flex justify-center items-center px-4">
            <Image src="/heart.svg" alt="heart" width={20} height={20} />
          </Button>

          <Button variant="ghost" className="flex justify-center items-center px-4">
            <Image src="/export.svg" alt="export" width={20} height={20} />
          </Button>

          <Button variant="ghost" className="flex justify-center items-center px-4">
            <Image src="/bar.svg" alt="bar" width={20} height={20} />
          </Button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
