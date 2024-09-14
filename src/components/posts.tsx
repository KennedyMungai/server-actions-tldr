import { fetchPosts } from "@/server/actions/fetch-posts";
import "server-only";

const Posts = async () => {
	const fetchedPosts = await fetchPosts().then((res) => res.success);

	return (
		<div className="max-w-4xl mx-auto mt-4">
			<ul className="space-y-4">
				{fetchedPosts.map((post) => (
					<li key={post.id}>{post.content}</li>
				))}
			</ul>
		</div>
	);
};

export default Posts;
