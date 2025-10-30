import { db } from "@/db";
import { categoriesTable, learningLogsTable } from "../schema";
import { SeedResult } from "./seed";

type LearningLogRow = typeof learningLogsTable.$inferInsert;

export const seedLearningLogs = async (
  userId: string,
  categories: (typeof categoriesTable.$inferSelect)[],
): Promise<SeedResult> => {
  const data: LearningLogRow[] = [
    {
      title: "Learning Go",
      clerkId: userId,
      categoryId: categories.find((category) => category.title === "go")!.id,
    },
    {
      title: "Learning Next",
      clerkId: userId,
      categoryId: categories.find((category) => category.title === "go")!.id,
    },
  ];

  const result = await db.insert(learningLogsTable).values(data).returning();

  return [`${data.length} Learning Logs succesfully inserted`, result];
};
