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
  const [userStats] = trpc.userLearningStats.getWeeklyHours.useSuspenseQuery();

  return <LearningStats data={categories} weeklyHours={userStats} />;
};

export default LearningStatsSection;
