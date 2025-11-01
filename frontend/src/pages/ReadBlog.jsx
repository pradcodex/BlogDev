import { getPost } from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"

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
    <div className="flex flex-col items-center w-1/3">
      <Button onClick={() => navigate(-1)} className="w-48 my-4">Back</Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">{post.title}</h1>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">{post.description}</h2>
      <div className="flex w-full justify-center">
        {(post.image?.secure_url || post.image?.url) && (
          <img 
            src={post.image.secure_url || post.image.url} 
            alt={post.title} 
            className="max-h-96 my-4 rounded-lg" 
          />
        )}
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{post.dateCreated?.slice(4, 15)}</h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">{post.content}</p>
    </div>
  )
  // return (
  //   <>
  //     <button onClick={() => navigate(-1)}>Back</button>
  //     <h1>{post.title}</h1>
  //     <h2>{post.description}</h2>
  //     {post.image?.url && <img src={post.image.url} alt={post.title} />}
  //     <h4>{post.dateCreated?.slice(4, 15)}</h4>
  //     <p>{post.content}</p>
  //   </>
  // );
}
