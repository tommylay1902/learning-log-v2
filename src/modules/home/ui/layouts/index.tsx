import * as React from "react";
import HomeNavbar from "../components/home-navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <HomeNavbar />
      <div className="flex min-h-screen pt-[4rem]">
        <main className="flex-1 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
};

export default HomeLayout;
