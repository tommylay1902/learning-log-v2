import StudyView from "@/modules/study/ui/views/study-view";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Study",
};
const Page = () => {
  return <StudyView />;
};

export default Page;
