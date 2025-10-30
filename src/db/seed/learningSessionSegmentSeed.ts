import { db } from "@/db";
import {
  learningLogsTable,
  learningSessionSegmentsTable,
  learningSessionsTable,
} from "../schema";
import { SeedResult } from "./seed";

type LearningSessionSegmentRow =
  typeof learningSessionSegmentsTable.$inferInsert;

export const seedLearningSessionSegments = async (
  learningSessions: (typeof learningSessionsTable.$inferSelect)[],
): Promise<SeedResult> => {
  const date = new Date();

  const data: LearningSessionSegmentRow[] = [
    {
      learningSessionId: learningSessions.find((ls) =>
        ls.title?.includes("Go"),
      )!.id,
      notes:
        "Spent an hour going through a go.dev article on bytes vs runes and deep diving into how slices work in go",
    },
    {
      learningSessionId: learningSessions.find((ls) =>
        ls.title?.includes("seeding"),
      )!.id,
      notes: "Spent an hour building out the seeding data in learning-log-v2",
    },
  ];

  const result = await db
    .insert(learningSessionSegmentsTable)
    .values(data)
    .returning();

  return [
    `${data.length} Learning Session Segments succesfully inserted`,
    result,
  ];
};
