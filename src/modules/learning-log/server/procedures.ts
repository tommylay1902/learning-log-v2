import { db } from "@/db";
import {
    learningLogsTable,
    learningSessionSegmentsTable,
    learningSessionsTable,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const learningLogRouter = createTRPCRouter({
    getByManyByUser: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.clerkUserId) throw new TRPCError({ code: "UNAUTHORIZED" });

        const data = await db
            .select()
            .from(learningLogsTable)
            .innerJoin(
                learningSessionsTable,
                eq(learningLogsTable.id, learningSessionsTable.learningLogId),
            )
            .where(eq(learningLogsTable.clerkId, ctx.clerkUserId));

        const groupedLogs = data.reduce(
            (acc, val) => {
                const date = val.learning_logs.createdAt.toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = [val];
                } else acc[date].push(val);
                return acc;
            },
            {} as { [key: string]: (typeof data)[0][] },
        );

        return groupedLogs;
    }),
    getLearningSegments: protectedProcedure.query(async ({}) => {
        const data = await db
            .select({
                sessionId: learningSessionsTable.id,
                learningSessionSegmentsTable,
            })
            .from(learningSessionSegmentsTable)
            .innerJoin(
                learningSessionsTable,
                eq(
                    learningSessionSegmentsTable.learningSessionId,
                    learningSessionsTable.id,
                ),
            );

        const groupedSessions = data.reduce(
            (acc, val) => {
                if (!acc[val.sessionId]) {
                    acc[val.sessionId] = [val];
                } else acc[val.sessionId].push(val);
                return acc;
            },
            {} as { [key: string]: (typeof data)[0][] },
        );

        return groupedSessions;
    }),
});
