import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import React from "react";
interface TimelineHeaderProps {
    date: string;
    log: {
        learning_logs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            categoryId: string | null;
            clerkId: string | null;
        };
        learning_sessions: {
            id: string;
            startTime: Date;
            endTime: Date;
            title: string | null;
            learningLogId: string | null;
        };
    }[];
}
const TimelineHeader = ({ date, log }: TimelineHeaderProps) => {
    return (
        <div className="flex items-center justify-between space-x-4 text-3xl font-bold mr-3 border-b-2 border-white pb-2">
            <div className="pt-1">{date}</div>
            <div className="pt-1 flex items-center gap-x-2">
                Time studied:{" "}
                {log
                    .reduce((acc, time) => {
                        const startTime =
                            time.learning_sessions.startTime.getTime();
                        const endTime =
                            time.learning_sessions.endTime.getTime();
                        acc += (endTime - startTime) / 3600000;
                        return acc;
                    }, 0)
                    .toFixed(2)}
                hrs
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Info />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-md">
                            Time calculated from{" "}
                            <a
                                href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                                className="text-blue-600"
                            >
                                Pomodoro
                            </a>{" "}
                            work sessions only (breaks excluded).
                        </p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
};

export default TimelineHeader;
