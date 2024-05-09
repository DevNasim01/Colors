import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full px-5 md:px-10 py-4 md:py-5 text-2xl md:text-4xl border-b-2 shadow-sm tracking-wider flex items-center">
      <Link href="/" className=" text-2xl lg:text-[2.3vw] font-extrabold capitalize">
        colors
      </Link>
      <div className="w-full"> </div>
      <UserButton />
    </nav>
  );
};

export default Header;
