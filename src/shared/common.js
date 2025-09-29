import axios from "axios";


export const getHeaders=(token)=>({
     "Content-Type": "application/json",
     "Authorization": `Bearer ${token}`,
});


export const httpGet=(url,token)=>{
    return axios.get(url,{
        headers:getHeaders(token),
    })
}