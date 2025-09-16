"use client";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import Timeline from "../components/timeline";

const TimelineSection = () => {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <TimeLineSectionSuspense />
        </Suspense>
    );
};

const TimeLineSectionSuspense = () => {
    const [logs] = trpc.learningLogs.getByManyByUser.useSuspenseQuery();
    const [segments] = trpc.learningLogs.getLearningSegments.useSuspenseQuery();

    return (
        <div>
            <Timeline logs={logs} segments={segments} />
        </div>
    );
};

export default TimelineSection;
