import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../redux/slices/blogs";
import { Navigate } from "react-router-dom";

export default function BlogGetCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [createdBlog, setCreatedBlog] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          Post_title: title,
          Post_content: content,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("access");
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

     const data = await response.json();
     
      console.log("Created",data);
      setCreatedBlog(data)
      setTitle("");
      setContent("");

     

     
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        />
      </div>

      <button type="submit">Add Blog</button>
    </form>
    <div>{createdBlog.Post_title}</div><br />
    <div>{createdBlog.Post_content}</div>
    </>
    
  );
}
