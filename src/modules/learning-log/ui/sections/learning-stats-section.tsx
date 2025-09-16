"use client";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import LearningStats from "../components/learning-stats";

const LearningStatsSection = () => {
    return (
        <Suspense>
            <LearningStatsSectionSuspense />
        </Suspense>
    );
};

const LearningStatsSectionSuspense = () => {
    const [categories] = trpc.categories.getManyByUser.useSuspenseQuery();
    console.table(categories);
    return <LearningStats />;
};

export default LearningStatsSection;
