import { db } from "@/db";
import { categoriesTable } from "../schema";
import { SeedFunction } from "./seed";

type CategoryRow = typeof categoriesTable.$inferInsert;

export const seedCategories: SeedFunction = async () => {
  const data: CategoryRow[] = [
    {
      title: "next",
      color: "#000000",
    },
    {
      title: "go",
      color: "#40E0D0",
    },
    {
      title: "leetcode",
      color: "#FFD700",
    },
    {
      title: "system",
      color: "#00FF00",
    },
  ];

  await db.insert(categoriesTable).values(data);

  return `${data.length} categories succesfully inserted`;
};
