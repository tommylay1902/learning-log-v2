import { db } from "@/db";
import {
  categoriesTable,
  learningLogsTable,
  learningSessionSegmentsTable,
  learningSessionsTable,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
export const categoryRouter = createTRPCRouter({
  getManyByUser: protectedProcedure.query(({ ctx }) => {
    if (!ctx.clerkUserId) throw new TRPCError({ code: "UNAUTHORIZED" });
    const data = db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.userId, ctx.clerkUserId));

    return data;
  }),
  categoryByHours: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.clerkUserId) throw new TRPCError({ code: "UNAUTHORIZED" });
    const data = await db
      .select({
        title: categoriesTable.title,
        total_time: sql`sum(${learningSessionSegmentsTable.timespent})`.mapWith(
          Number,
        ),
        color: categoriesTable.color,
      })
      .from(categoriesTable)
      .innerJoin(
        learningLogsTable,
        eq(categoriesTable.id, learningLogsTable.categoryId),
      )
      .innerJoin(
        learningSessionsTable,
        eq(learningSessionsTable.learningLogId, learningLogsTable.id),
      )
      .innerJoin(
        learningSessionSegmentsTable,
        eq(
          learningSessionSegmentsTable.learningSessionId,
          learningSessionsTable.id,
        ),
      )
      .where(eq(categoriesTable.userId, ctx.clerkUserId))
      .groupBy(categoriesTable.title, categoriesTable.id);

    return data;
  }),
});
