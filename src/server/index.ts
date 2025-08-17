import { db } from "@/db";
import { publicProcedure, router } from "./trpc";
import { usersTable } from "@/db/schema";
const appRouter = router({
  getManyUsers: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const users = await db.select().from(usersTable);

    return users;
  }),
});
