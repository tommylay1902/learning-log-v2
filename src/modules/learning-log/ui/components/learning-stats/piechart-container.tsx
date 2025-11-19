import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import React from "react";
import { LearningPieChart } from "./learning-piechart";

interface PiechartContainerProps {
  data: {
    title: string;
    total_time: number;
    color: string;
  }[];
}

const PiechartContainer = ({ data }: PiechartContainerProps) => {
  console.log("eat cheese");
  return (
    <Card className="flex flex-col border-0 bg-inherit">
      {/*animate-float-up delay-700 opacity-0*/}
      <CardHeader className="items-center pb-0 text-center ">
        <CardTitle>Pie Chart - Study Allocation Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <LearningPieChart data={data} />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm animate-float-up opacity-0 delay-700">
        <h1 className="flex gap-x-2">
          Total Working Hours Logged:
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-md">
                Time calculated from{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                  className="text-blue-600 "
                >
                  Pomodoro
                </a>{" "}
                work sessions only (breaks excluded).
              </p>
            </TooltipContent>
          </Tooltip>
        </h1>
        <h1>
          Total hours spent this week:{" "}
          {/*{((weeklyHours * 50) / 60).toFixed(2)}*/}
        </h1>
      </CardFooter>
    </Card>
  );
};

export default PiechartContainer;
