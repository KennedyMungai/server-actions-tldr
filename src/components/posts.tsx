import { fetchPosts } from "@/server/actions/fetch-posts";
import "server-only";

const Posts = async () => {
	const fetchedPosts = await fetchPosts().then((res) => res.success);

	return (
		<div>
			{fetchedPosts.map((post) => (
				<p key={post.id}>{post.content}</p>
			))}
		</div>
	);
};

export default Posts;
