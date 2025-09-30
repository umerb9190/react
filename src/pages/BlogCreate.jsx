import { useState } from "react";
import { useSelector } from "react-redux";
// import { addBlog } from "../redux/slices/blogs";
import { Navigate } from "react-router-dom";
import { httpPost } from "../shared/common";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {Authenticated}=useSelector((state)=>state.auth);
  console.log("AUTH in create", Authenticated)


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    const payload={
      Post_title:title,
      Post_content:content
     }
   
    try {
     
     console.log("payload: ",payload)
     httpPost("http://localhost:8000/blog/",token,payload).then((res)=>{
      console.log("blog created: ", res.data)
     }).catch((err)=>{
       console.error("Error fetching blogs:", err);

     })
  
     
      console.log("Blog Created");

     

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (Authenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!Authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
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
  );
}
