"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    // Fetch posts
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleAddPost = async () => {
    try {
      const res = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        const post = await res.json();
        setPosts([...posts, post]);
        setNewPost({ title: "", content: "" });
      } else {
        alert("Failed to add post.");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      const res = await fetch(`/api/posts/delete/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Panel</h1>
      <div>
        <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="border p-2 mb-2 w-full"
        ></textarea>
        <button
          onClick={handleAddPost}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Post
        </button>
      </div>

      <h2 className="text-2xl font-bold mt-8">All Posts</h2>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b py-4">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="mt-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
