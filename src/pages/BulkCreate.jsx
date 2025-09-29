import { useState } from "react";


export default function BulkCreate() {
  const [posts, setPosts] = useState([
    { Post_title: "", Post_content: "" }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...posts];
    updated[index][field] = value;
    setPosts(updated);
  };

  const addPost = () => {
    setPosts([...posts, { Post_title: "", Post_content: "" }]);
  };

  const handleSubmit = async () => {
    try {
        const token = localStorage.getItem("access");
      const res = fetch("http://localhost:8000/blog/", {
        method:"POST",
        body:JSON.stringify(posts),
        headers: { "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
         },

      });
      console.log("Created:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {posts.map((post, idx) => (
        <div key={idx}>
          <input
            type="text"
            placeholder="Title"
            value={post.Post_title}
            onChange={(e) => handleChange(idx, "Post_title", e.target.value)}
          />
          <input
            type="text"
            placeholder="Content"
            value={post.Post_content}
            onChange={(e) => handleChange(idx, "Post_content", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addPost}>+ Add Another</button>
      <button onClick={handleSubmit}>Submit All</button>
    </div>
  );
}
