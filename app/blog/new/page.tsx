"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import SubmitButton from "../_component/SubmitButton";

const style =
  "border-2 border-black text-blue-800 px-2 py-1 rounded hover:bg-blue-100 focus-within:bg-blue-200";

export default function New() {
  const [formData, setFormData] = useState({
    subject: "",
    detail: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred.");
      } else {
        setSuccessMessage("Post created successfully!");
        redirect("/blog");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>New Post</h1>
      <hr />
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col mb-2">
          <label htmlFor="subject">Subject</label>
          <input
            className={style}
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="detail">Detail</label>
          <textarea
            className={style}
            name="detail"
            id="detail"
            value={formData.detail}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-600 mb-4">{successMessage}</div>
        )}
        <SubmitButton label="Post" />
      </form>
      <br />
      <hr />
      <Link href="/blog">Back</Link>
    </div>
  );
}
