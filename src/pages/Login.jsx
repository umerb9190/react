import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [userName, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
           e.preventDefault();
        const response=await fetch('http://localhost:8000/login/',{
          method:"POST",
          headers:{
          "Content-Type": "application/json",
        },
          body:JSON.stringify({username:userName,password:password})  
        })
        const data=await response.json();
        console.log("data: ",data)
        if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        alert("Login successful!");
        navigate("/")
       
      } else {
        alert("Invalid credentials");
      }
    }
  return (
     <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input 
          type="text" 
          value={userName}
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label>Password:</label>
       <input
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} />
      </div>

      <button type="submit">Sign In</button>
    </form>

  )



}