"use server";

import { formSchema } from "@/components/postform";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

export const action = createSafeActionClient();

export const createPost = action
	.schema(formSchema)
	.action(async ({ parsedInput: { content } }) => {
		const newPost = await db.insert(posts).values({ content }).returning();

		if (!newPost) return { error: "Something went wrong" };

		revalidatePath("/");

		return { success: newPost };
	});