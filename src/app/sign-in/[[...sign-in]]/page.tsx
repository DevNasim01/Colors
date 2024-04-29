import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <>
    <div className="w-full h-dvh flex items-center justify-center flex-col gap-10">
        <h1 className="hidden md:block text-4xl font-semibold">This is a Sing-In page</h1>
    <SignIn path="/sign-in"/>
    </div>
    </>
  );
}