import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateBlog } from "../redux/slices/blogs";

export default function BlogUpdate() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blog.find((i) => i.id === parseInt(id))
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);


  useEffect(() => {
    if (blog) {
      setTitle(blog.Post_title);
      setContent(blog.Post_content);
    }
  }, [blog]);

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

    const updated = { ...blog, Post_title: title, Post_content: content };
    console.log("watch ", updated);

    try {
      const response = await fetch(`http://localhost:8000/blog/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (response.status === 401) {
        localStorage.removeItem("access");
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      // const updatedBlog = await response.json();
      // dispatch(updateBlog(updatedBlog));
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
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
