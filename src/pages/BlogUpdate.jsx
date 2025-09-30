import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateBlog } from "../redux/slices/blogs";
import { httpPut } from "../shared/common";

export default function BlogUpdate() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blog.find((i) => i.id === parseInt(id))
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
    const {Authenticated}=useSelector((state)=>state.auth);


  useEffect(() => {
    if (blog) {
      setTitle(blog.Post_title);
      setContent(blog.Post_content);
    }
  }, [blog]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    const updated = { ...blog, Post_title: title, Post_content: content };
    console.log("watch ", updated);

    try {
      httpPut(`http://localhost:8000/blog/${id}/`,token,updated).then((res)=>{
        console.log("updated: ",res.data)
      }).catch((err)=>{
       console.error("Error fetching blogs:", err);
      })

      

      // const updatedBlog = await response.json();
      // dispatch(updateBlog(updatedBlog));
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (Authenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!Authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Content:</label>
        <textarea
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        />
      </div>

      <button type="submit">Update Blog</button>
    </form>
  );
}
