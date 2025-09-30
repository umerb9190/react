import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../redux/slices/blogs";
import { useNavigate, Navigate } from "react-router-dom";
import { httpDelete, httpGet } from "../shared/common";

export default function BlogList() {
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blog);
  const navigate = useNavigate();

  
  const Handler1 = () => {
    navigate("blog/create");
  };

  const Handler2 = async (id) => {
    try {
      httpDelete(`http://localhost:8000/blog/${id}/`).then((res)=>{
      }).catch((err)=>{
        console.error(err);
      })

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
   
    const getPost = async () => {
      try {
        setLoading(true);

       httpGet("http://localhost:8000/blog/")
        .then((res) => {
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
