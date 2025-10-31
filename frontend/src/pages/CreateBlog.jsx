import { useState, useRef } from "react";
import { createPost } from "../api";

export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const MAX_IMAGE_SIZE = 15000000;

  const inputFile = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    let submitObject = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
      image: image,
    };

    await createPost(submitObject);

    // Clear form fields after successful submission
    setTitle("");
    setDescription("");
    setContent("");
  }
  function handleFileUpload(e) {
    const file = e.target.files[0];
    // console.log(file);
    const fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);
    // console.log(fileExtension);
    if (fileExtension !== "jpg" && fileExtension !== "png" && fileExtension !== "jpeg") {
      alert("Invalid file type. Please upload a JPG, PNG, or JPEG file.");
      inputFile.current.value = ""
      inputFile.current.type = "file";
      return;
    }
    if(file.size > MAX_IMAGE_SIZE) {
      alert("File size is too large. Please upload a file smaller than 15MB.");
      inputFile.current.value = ""
      inputFile.current.type = "file";
      return;
    }
    setImage(file)
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
      <label>Insert Header Image: </label>
      <input type="file" onChange={handleFileUpload} ref={inputFile}/>

      <button type="submit">Submit</button>
    </form>
  );
}
