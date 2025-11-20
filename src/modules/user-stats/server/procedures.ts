import { db } from "@/db";
import { userLearningStatsTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const userStatsRouter = createTRPCRouter({
  getWeeklyHours: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.clerkUserId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const data = await db
      .select({ weeklyHours: userLearningStatsTable.weeklyHours })
      .from(userLearningStatsTable)
      .where(eq(userLearningStatsTable.userId, ctx.clerkUserId))
      .limit(1);
    return data[0]?.weeklyHours ?? 0;
  }),
});
