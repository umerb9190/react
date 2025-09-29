import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, deleteBlog } from "../redux/slices/blogs";
import { useNavigate, Navigate } from "react-router-dom";

export default function BlogList() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blog);
  const navigate = useNavigate();

  const Handler1 = () => {
    navigate("blog/create");
  };

  const Handler2 = async (id) => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(`http://localhost:8000/blog/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("access");
        setIsAuthenticated(false);
        return;
      }

      const data = await response.json();
      console.log("delete response ", data);
      dispatch(deleteBlog(id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    const getPost = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:8000/blog/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("access");
          setIsAuthenticated(false);
          return;
        }

        const data = await response.json();
        console.log("data ", data);
        dispatch(setBlog(data));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [dispatch]);


  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h2>All Blogs</h2>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.Post_title}</h3>
              <p>{blog.Post_content}</p>
              <button onClick={() => navigate(`blog/update/${blog.id}`)}>
                Update
              </button>
              <br />
              <button onClick={() => Handler2(blog.id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      <button onClick={Handler1}>Add Blog</button>
    </div>
  );
}
