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
  const [categories] = trpc.categories.categoryByHours.useSuspenseQuery();

  return <LearningStats data={categories} />;
};

export default LearningStatsSection;
