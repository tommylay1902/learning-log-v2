import PomodoroView from "@/modules/study/ui/views/pomodoro-view";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Pomodoro",
};
const Page = () => {
  return <PomodoroView />;
};

export default Page;
