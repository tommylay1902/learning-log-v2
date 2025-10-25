interface StudyLayoutProps {
  children: React.ReactNode;
}

import React from "react";

const StudyLayout = ({ children }: StudyLayoutProps) => {
  return <div className="w-full h-full">{children}</div>;
};

export default StudyLayout;
