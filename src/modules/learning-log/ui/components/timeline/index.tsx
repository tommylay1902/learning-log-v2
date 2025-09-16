import { Separator } from "@/components/ui/separator";
import React from "react";
import TimelineHeader from "./timeline-header";
import TimelineContent from "./timeline-content";

interface TimelineProps {
    logs: {
        [key: string]: {
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
    };
    segments: {
        [key: string]: {
            sessionId: string;
            learningSessionSegmentsTable: {
                id: string;
                notes: string | null;
                timespent: number;
                learningSessionId: string | null;
            };
        }[];
    };
}
const Timeline = ({ logs, segments }: TimelineProps) => {
    return (
        <div className="relative">
            <Separator
                orientation="vertical"
                className="bg-white absolute left-2 top-4"
            />
            {Object.entries(logs).map(([date, log], index) => (
                <div key={index} className="relative mb-10 pl-8 ">
                    <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
                    <TimelineHeader date={date} log={log} />
                    {log
                        .sort(
                            (a, b) =>
                                b.learning_sessions.startTime.getTime() -
                                a.learning_sessions.startTime.getTime(),
                        )
                        .map((l, index) => {
                            return (
                                <TimelineContent
                                    key={index}
                                    segments={segments[l.learning_sessions.id]}
                                    startTime={l.learning_sessions.startTime}
                                    endTime={l.learning_sessions.endTime}
                                />
                            );
                        })}
                </div>
            ))}
        </div>
    );
};

export default Timeline;
