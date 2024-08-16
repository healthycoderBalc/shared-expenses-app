import Link from "next/link";
import React from "react";
const fetchPosts = () => {
  console.log("something");
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  }).then((res) => res.json());
};

const Posts = async () => {
  const posts = await fetchPosts();

  return posts.slice(0, 5).map((post: any) => (
    <article key={post.id}>
      <Link href="/posts/[id]" as={`/posts/${post.id}`}>
        <h2 className="text-xl">{post.title}</h2>
        <p className="text-sm mb-8">{post.body}</p>
      </Link>
    </article>
  ));
};

export default Posts;
