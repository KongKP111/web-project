"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/admin/posts");
      const data: Post[] = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // Add new post
  const addPost = async () => {
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const newPost: Post = await res.json();
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setTitle(""); // Reset title
      setContent(""); // Reset content
    }
  };

  // Delete a post
  const deletePost = async (id: number) => {
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </header>
      <section className="p-8">
        <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={addPost}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Post
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Manage Posts</h2>
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.content}</p>
              </div>
              <button
                onClick={() => deletePost(post.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
