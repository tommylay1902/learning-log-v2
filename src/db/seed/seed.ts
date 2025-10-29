import { seedCategories } from "./categorySeed";
export type SeedFunction = () => Promise<string>;
const seedDb = async () => {
  console.log("seeding database");

  console.log("Adding seed table functions");

  const res = await Promise.allSettled([seedCategories()]);

  res.forEach((result) => {
    if (result.status === "rejected") {
      console.log("Error seeding database", result.reason);
    } else {
      console.log(result.value);
    }
  });

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

seedDb()
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding database", err);
    process.exit(1);
  });
