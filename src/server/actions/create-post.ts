"use server";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const postSchema = z.object({
	content: z.string().min(2, { message: "Post is required" }),
});

export const createPost = actionClient
	.schema(postSchema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { content } }) => {
		await db
			.insert(posts)
			.values({ content })
			.returning()
			.then((res) => res[0]);

        revalidatePath("/");
		return { success: "Successfully created a post" };
	});
