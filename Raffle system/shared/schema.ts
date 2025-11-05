import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const participants = pgTable("participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  prizeId: varchar("prize_id"),
});

export const prizes = pgTable("prizes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  totalQuantity: integer("total_quantity").notNull().default(1),
  wonQuantity: integer("won_quantity").notNull().default(0),
});

export const winners = pgTable("winners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  participantName: text("participant_name").notNull(),
  prizeName: text("prize_name").notNull(),
  prizeId: varchar("prize_id").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertParticipantSchema = createInsertSchema(participants).omit({
  id: true,
});

export const insertPrizeSchema = createInsertSchema(prizes).omit({
  id: true,
  wonQuantity: true,
});

export const insertWinnerSchema = createInsertSchema(winners).omit({
  id: true,
});

export type InsertParticipant = z.infer<typeof insertParticipantSchema>;
export type Participant = typeof participants.$inferSelect;

export type InsertPrize = z.infer<typeof insertPrizeSchema>;
export type Prize = typeof prizes.$inferSelect;

export type InsertWinner = z.infer<typeof insertWinnerSchema>;
export type Winner = typeof winners.$inferSelect;
