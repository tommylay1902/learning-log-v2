import { db } from "@/db";
import { learningLogsTable, learningSessionsTable } from "../schema";
import { SeedResult } from "./seed";

type LearningSessionRow = typeof learningSessionsTable.$inferInsert;

export const seedLearningSessions = async (
  learningLogs: (typeof learningLogsTable.$inferSelect)[],
): Promise<SeedResult> => {
  const now = new Date();

  const yesterday = new Date(now);

  yesterday.setDate(yesterday.getDate() - 1);

  const fdStart = new Date(yesterday);
  fdStart.setHours(12, 0, 0, 0);

  const fdEndTime = new Date(yesterday);
  fdEndTime.setHours(14, 0, 0, 0);

  const lcStartTime = new Date(yesterday);
  lcStartTime.setHours(14, 0, 0, 0);

  const lcEndTime = new Date(yesterday);
  lcEndTime.setHours(16, 0, 0, 0);

  const data: LearningSessionRow[] = [
    {
      title: "Go Internals",
      startTime: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      endTime: now,
      learningLogId: learningLogs.find((ll) => ll.title.includes("Go"))!.id,
    },
    {
      title: "Building out the seeding data",
      startTime: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      learningLogId: learningLogs.find((ll) => ll.title.includes("Next"))!.id,
    },
    {
      title: "Finding Dasher",
      startTime: fdStart,
      endTime: fdEndTime,
      learningLogId: learningLogs.find((ll) => ll.title.includes("Go"))!.id,
    },
    {
      title: "LC Time !",
      startTime: lcStartTime,
      endTime: lcEndTime,
      learningLogId: learningLogs.find((ll) => ll.title.includes("Leetcode"))!
        .id,
    },
  ];

  const result = await db
    .insert(learningSessionsTable)
    .values(data)
    .returning();

  return [`${data.length} Learning Logs succesfully inserted`, result];
};
