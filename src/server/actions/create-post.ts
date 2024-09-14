"use server";

import { z } from "zod";
import { createPostSchema, posts } from "@/db/schema";
import { db } from "@/db/drizzle";
import { revalidatePath } from "next/cache";

type CreatePost = z.infer<typeof createPostSchema>;

export const createPost = async (values: CreatePost) => {
	const newPost = await db
		.insert(posts)
		.values(values)
		.returning()
		.then((res) => res[0]);

	if (!newPost) return { error: "Could not create post" };

	revalidatePath("/");

	return { success: newPost };
};
