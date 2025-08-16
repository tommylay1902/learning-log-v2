// import { relations } from "drizzle-orm";
import {
  uuid,
  integer,
  pgTable,
  timestamp,
  varchar,
  text,
  smallint,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const learningLogsTable = pgTable("learning_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  title: text("title").notNull(),
  categoryId: uuid("category_id").references(() => categoriesTable.id, {
    onDelete: "cascade",
  }),
});

// using join syntax so this won't be necessary but keeping just in case
// export const learningLogsTableRelations = relations(
//   learningLogsTable,
//   ({ one }) => ({
//     categoriesTable: one(categoriesTable),
//     learningSessionsTable: one(learningSessionsTable),
//   }),
// );

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  title: text("title").notNull(),
  color: text("color").default("#01377D").notNull(),
});

// using join syntax so this won't be necessary but keeping just in case
// export const categoriesTableRelations = relations(
//   categoriesTable,
//   ({ many }) => ({
//     learningLogsTable: many(learningLogsTable),
//   }),
// );

export const learningSessionsTable = pgTable("learning_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  // timeSpent: real("time_spent").default(1).notNull(),
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time").defaultNow().notNull(),
  learningLogId: uuid("learning_log_id").references(
    () => learningLogsTable.id,
    { onDelete: "cascade" },
  ),
});

// using join syntax so this won't be necessary but keeping just in case
// export const learningSessionsTableRelations = relations(
//   learningSessionsTable,
//   ({ one, many }) => ({
//     learningLogsTable: one(learningLogsTable),
//     learningSessionSegmentsTable: many(learningSessionSegmentsTable),
//   }),
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
// export const learningSessionSegmentsTable = relations(
//   learningSessionSegmentsTable,
//   ({ one }) => ({
//     learningSessionsTable: one(learningLogsTable),
//   }),
// );

// learning session
