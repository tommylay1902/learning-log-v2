import { config } from "dotenv";
import { seedCategories } from "./categorySeed";
import { seedLearningLogs } from "./learningLogSeed";
import {
  categoriesTable,
  learningLogsTable,
  learningSessionsTable,
} from "../schema";
import { seedLearningSessions } from "./learningSessionSeed";
import { seedLearningSessionSegments } from "./learningSessionSegmentSeed";

export type SeedResult = [string, Array<object>];
const seedDb = async (userId: string) => {
  try {
    console.log("seeding database");

    console.log("Generating categories for user...");
    const categoryRes = await seedCategories(userId);
    console.log(categoryRes[0]);

    console.log("Generating learning logs for user...");
    const learningLogRes = await seedLearningLogs(
      userId,
      categoryRes[1] as (typeof categoriesTable.$inferSelect)[],
    );
    console.log(learningLogRes[0]);

    console.log("Generating learning sessions for each log...");
    const learningSessionRes = await seedLearningSessions(
      learningLogRes[1] as (typeof learningLogsTable.$inferSelect)[],
    );
    console.log(learningSessionRes[0]);

    console.log(
      "Generating learning session segments for each learning session...",
    );
    const learningSessionSegmentRes = await seedLearningSessionSegments(
      learningSessionRes[1] as (typeof learningSessionsTable.$inferSelect)[],
    );
    console.log(learningSessionSegmentRes[0]);
  } catch (e) {
    console.error("Error seeding category data into the database... ", e);
  }

  // console.log("adding related data...");
  //these should be the tables that require previous data to be installed

  // const dependentTasks = [];

  // for (const task of dependentTasks) {
  //   try {
  //   } catch (e) {
  //     console.log("Error seeding database", e);
  //   }
  // }
};

config({ path: ".env.local" });
const userId = process.env.SEED_USER_ID;
if (!userId) {
  throw new Error("Problem reading env or seed user id was not provided");
}

seedDb(userId)
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding database", err);
    process.exit(1);
  });
