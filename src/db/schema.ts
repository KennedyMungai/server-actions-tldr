import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const posts = pgTable("posts", {
	id: uuid("id").defaultRandom().primaryKey(),
	content: text("content").notNull(),
});

export const createPostSchema = createInsertSchema(posts).omit({ id: true });

export const selectPostSchema = createSelectSchema(posts);
