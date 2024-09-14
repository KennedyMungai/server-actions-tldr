"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPost } from "@/server/actions/create-post";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const formSchema = z.object({
	content: z.string().min(2, { message: "Post is required" }),
});

const PostForm = () => {
	const { execute, status } = useAction(createPost, {
		onExecute() {
			toast.loading(
				<div className="flex gap-x-4 items-center">
					<UpdateIcon className="size-6 animate-spin" />{" "}
					<span className="font-semibold text-lg">Creating post</span>
				</div>,
				{
					id: "creating-post",
				},
			);
		},
		onSuccess({ data }) {
			if (data?.success) {
				toast.success(data?.success);
				toast.dismiss("creating-post");
			}
		},
		onError({ error }) {
			if (error.serverError) {
				toast.error("Something went wrong");
			} else if (error.validationErrors) {
				toast.error("There is something wrong with the inputs");
			}

			toast.dismiss("create-post");
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		execute(values);

		form.reset();
	}

	return (
		<main>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 mx-auto max-w-4xl mt-10"
				>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Post</FormLabel>
								<FormControl>
									<Input placeholder="What's on your mind?" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={status === "executing"}>
						Submit
					</Button>
				</form>
			</Form>
		</main>
	);
};

export default PostForm;
