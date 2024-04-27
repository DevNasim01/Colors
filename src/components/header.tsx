import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full px-10 py-8 lg:py-[1.8vw] border-b-2 shadow-sm tracking-wider flex items-center">
      <Link href="/" className=" text-3xl lg:text-[2.5vw] font-extrabold capitalize">
        colors
      </Link>
      <div className="w-full"> </div>
      <UserButton />
    </nav>
  );
};

export default Header;
