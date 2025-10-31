import { getPost } from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ReadBlog() {
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    async function loadPost() {
      try {
        let data = await getPost(id);
        let date = new Date(data.dateCreated);
        data.dateCreated = date.toString();
        setPost(data);
      } catch (error) {
        console.error("Error loading post:", error);
        // If authentication error, show message
        if (error.message && error.message.includes("Authentication required")) {
          alert("Please log in to view this post");
          navigate("/");
        }
      }
    }
    loadPost();
  }, [id, navigate]);

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{post.title}</h1>
      <h2>{post.description}</h2>
      {post.image?.url && <img src={post.image.url} alt={post.title} />}
      <h4>{post.dateCreated?.slice(4, 15)}</h4>
      <p>{post.content}</p>
    </>
  );
}
