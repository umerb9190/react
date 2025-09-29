import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, deleteBlog } from "../redux/slices/blogs";
import { useNavigate, Navigate } from "react-router-dom";
import { httpGet } from "../shared/common";

export default function BlogList() {
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blog);
  const navigate = useNavigate();
  const { Authenticated } = useSelector((state) => state.auth);
  // console.log("check ", Authenticated)
  const token=useSelector((state)=>state.auth.token)
  // console.log("token1 in bloglist: ", token)

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

      const data = await response.json();
      console.log("delete response ", data);
      dispatch(deleteBlog(id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
   
    const getPost = async () => {
      try {
        setLoading(true);

       httpGet("http://localhost:8000/blog/", token)
        .then((res) => {
          console.log("Blogs:", res.data);
           dispatch(setBlog(res.data));
        })
        .catch((err) => {
          console.error(err);
        });

      
       
        
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [dispatch]);


  if (Authenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!Authenticated) {
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
