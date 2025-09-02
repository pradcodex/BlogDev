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
      let data = await getPost(id);
      let date = new Date(data.dateCreated);
      data.dateCreated = date.toString();
      setPost(data);
    }
    loadPost();
  }, []);

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{post.title}</h1>
      <h2>{post.description}</h2>
      <h4>{post.dateCreated?.slice(4, 15)}</h4>
      <p>{post.content}</p>
    </>
  );
}
