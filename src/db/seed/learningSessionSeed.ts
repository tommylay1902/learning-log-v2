import { db } from "@/db";
import { learningLogsTable, learningSessionsTable } from "../schema";
import { SeedResult } from "./seed";

type LearningSessionRow = typeof learningSessionsTable.$inferInsert;

export const seedLearningSessions = async (
  learningLogs: (typeof learningLogsTable.$inferSelect)[],
): Promise<SeedResult> => {
  const now = new Date();

  const data: LearningSessionRow[] = [
    {
      title: "Go slices and byte arrays",
      startTime: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      endTime: now,
      learningLogId: learningLogs.find((ll) => ll.title.includes("Go"))!.id,
    },
    {
      title: "Building out the seeding data",
      startTime: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      learningLogId: learningLogs.find((ll) => ll.title.includes("Next"))!.id,
    },
  ];

  const result = await db
    .insert(learningSessionsTable)
    .values(data)
    .returning();

  return [`${data.length} Learning Logs succesfully inserted`, result];
};
