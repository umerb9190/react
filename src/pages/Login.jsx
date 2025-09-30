import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../redux/slices/auth";
import { store } from "../redux/store";


export default function Login(){
    const [userName, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const navigate=useNavigate();
    const dispatch=useDispatch();
   

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

        const token = localStorage.getItem("access");
        console.log("token: ", token)
        dispatch(setAuth(token))  
        console.log("Redux state after dispatch:", store.getState());
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