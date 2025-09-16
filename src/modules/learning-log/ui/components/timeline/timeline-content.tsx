import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface TimelineContentProps {
    segments: {
        sessionId: string;
        learningSessionSegmentsTable: {
            id: string;
            notes: string | null;
            timespent: number;
            learningSessionId: string | null;
        };
    }[];
    startTime: Date;
    endTime: Date;
}

const TimelineContent = ({
    segments,
    startTime,
    endTime,
}: TimelineContentProps) => {
    return (
        <div className="cursor-pointer">
            <Accordion type="single" collapsible className="border-b-2">
                <AccordionItem value={`item-${segments[0].sessionId}`}>
                    <AccordionTrigger>
                        <div className="flex w-full justify-between  font-bold cursor-pointer">
                            <div className="w-fit text-xl text-center">
                                {startTime.toLocaleTimeString()}-
                                {endTime.toLocaleTimeString()}
                            </div>
                            <Separator
                                orientation="vertical"
                                className="bg-white h-5"
                            />

                            <div className="w-40 text-xl">{}</div>

                            <Separator
                                orientation="vertical"
                                className="bg-white h-5"
                            />

                            <div className="w-44 text-xl flex items-center gap-x-2">
                                Time Spent:{" "}
                                {segments
                                    .reduce(
                                        (acc, val) =>
                                            (acc +=
                                                val.learningSessionSegmentsTable
                                                    .timespent / 60),
                                        0,
                                    )
                                    .toFixed(2)}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-md">
                                            Represents how many{" "}
                                            <a
                                                href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                                                className="text-blue-600"
                                            >
                                                pomodoro sessions
                                            </a>{" "}
                                            were spent (current split is 50/10)
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 mb-3 text-balance">
                        <Table>
                            <TableBody>
                                {segments.map((segment, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-bold">
                                            {
                                                segment
                                                    .learningSessionSegmentsTable
                                                    .notes
                                            }
                                        </TableCell>
                                        <TableHead className="text-end font-bold">
                                            Session {index + 1}:{" "}
                                            {(
                                                segment
                                                    .learningSessionSegmentsTable
                                                    .timespent / 60
                                            ).toFixed(2)}{" "}
                                            hr(s)
                                        </TableHead>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default TimelineContent;
