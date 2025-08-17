import AuthButton from "@/modules/auth/ui/components/auth-button";
import Image from "next/image";

const RootNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 flex justify-between p-3">
      <div className="flex justify-center items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="invert"
        />
        <p className="text-white font-bold">Exchange</p>
      </div>

      <AuthButton />
    </nav>
  );
};

export default RootNavbar;
