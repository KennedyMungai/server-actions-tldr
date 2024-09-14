"use server";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";

export const fetchPosts = async () => {
	const fetchedPosts = await db.select().from(posts);

	return { success: fetchedPosts };
};
