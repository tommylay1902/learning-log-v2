import HomeLayout from "@/modules/home/ui/layouts";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
