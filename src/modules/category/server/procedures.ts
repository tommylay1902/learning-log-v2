import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const categoryRouter = createTRPCRouter({
    getManyByUser: protectedProcedure.query(({ ctx }) => {
        if (!ctx.clerkUserId) throw new TRPCError({ code: "UNAUTHORIZED" });
        const data = db
            .select()
            .from(categoriesTable)
            .where(eq(categoriesTable.userId, ctx.clerkUserId));

        return data;
    }),
});
