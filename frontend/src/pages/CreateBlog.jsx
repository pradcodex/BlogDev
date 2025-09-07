import { useState } from "react";
import { createPost } from "../api";

export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let submitObject = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
    };

    await createPost(submitObject);

    // Clear form fields after successful submission
    setTitle("");
    setDescription("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Blog Post Title: </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        type="text"
      />
      <label>Blog Description: </label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
        required
        type="text"
      />

      <label>Blog Content: </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={1000}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
}
