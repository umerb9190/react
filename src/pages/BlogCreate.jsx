import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../redux/slices/blogs";
import { httpPost } from "../shared/common";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload={
      Post_title:title,
      Post_content:content
     }
   
    try {
     
     httpPost("http://localhost:8000/blog/",payload).then((res)=>{
      dispatch(addBlog(res.data))
     }).catch((err)=>{
       console.error("Error fetching blogs:", err);

     })


     

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
