import { db } from "@/db";
import { categoriesTable } from "../schema";
import { SeedResult } from "./seed";

type CategoryRow = typeof categoriesTable.$inferInsert;

export const seedCategories = async (userId: string): Promise<SeedResult> => {
  const data: CategoryRow[] = [
    {
      title: "next",
      color: "#000000",
      userId,
    },
    {
      title: "go",
      color: "#40E0D0",
      userId,
    },
    {
      title: "leetcode",
      color: "#FFD700",
      userId,
    },
    {
      title: "system",
      color: "#00FF00",
      userId,
    },
  ];

  const result = await db.insert(categoriesTable).values(data).returning();

  return [`${data.length} categories succesfully inserted`, result];
};
