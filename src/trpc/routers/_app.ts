import { categoryRouter } from "@/modules/category/server/procedures";
import { createTRPCRouter } from "../init";
import { learningLogRouter } from "@/modules/learning-log/server/procedures";
export const appRouter = createTRPCRouter({
    learningLogs: learningLogRouter,
    categories: categoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
