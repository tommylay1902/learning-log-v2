import { relations } from "drizzle-orm";
import { uuid, pgTable, timestamp, text, smallint } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    emailAddress: text("").notNull(),
    imageUrl: text("image_url"),
});

export type NewUser = typeof usersTable.$inferInsert;

export const learningLogsTable = pgTable("learning_logs", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    title: text("title").notNull(),
    categoryId: uuid("category_id").references(() => categoriesTable.id, {
        onDelete: "cascade",
    }),
    clerkId: text("clerk_id").references(() => usersTable.clerkId, {
        onDelete: "cascade",
    }),
});

// using join syntax so this won't be necessary but keeping just in case
// export const learningLogsTableRelations = relations(
//     learningLogsTable,
//     ({ one }) => ({
//         categoriesTable: one(categoriesTable),
//     }),
// );

export const categoriesTable = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    title: text("title").notNull(),
    color: text("color").default("#01377D").notNull(),
    userId: text("user_id").references(() => usersTable.clerkId, {
        onDelete: "cascade",
    }),
});

// using join syntax so this won't be necessary but keeping just in case
// export const categoriesTableRelations = relations(
//     categoriesTable,
//     ({ many, one }) => ({
//         learningLogsTable: many(learningLogsTable),
//         usersTable: one(usersTable),
//     }),
// );

export const learningSessionsTable = pgTable("learning_sessions", {
    id: uuid("id").primaryKey().defaultRandom(),
    // timeSpent: real("time_spent").default(1).notNull(),
    startTime: timestamp("start_time").defaultNow().notNull(),
    endTime: timestamp("end_time").defaultNow().notNull(),
    title: text("title"),
    learningLogId: uuid("learning_log_id").references(
        () => learningLogsTable.id,
        { onDelete: "cascade" },
    ),
});

// using join syntax so this won't be necessary but keeping just in case
// export const learningSessionsTableRelations = relations(
//     learningSessionsTable,
//     ({ one, many }) => ({
//         learningLogsTable: one(learningLogsTable),
//         learningSessionSegmentsTable: many(learningSessionSegmentsTable),
//     }),
// );

export const learningSessionSegmentsTable = pgTable(
    "learning_session_segments",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        notes: text("notes"),
        timespent: smallint("time_spent").default(60).notNull(),
        learningSessionId: uuid("learning_session_id").references(
            () => learningSessionsTable.id,
            { onDelete: "cascade" },
        ),
    },
);

// using join syntax so this won't be necessary but keeping just in case
// export const learningSessionSegmentsTableRelations = relations(
//     learningSessionSegmentsTable,
//     ({ one }) => ({
//         learningSessionsTable: one(learningLogsTable),
//     }),
// );

// learning session
