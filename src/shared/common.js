import axios from "axios";



const token = localStorage.getItem("access");
export const getHeaders=()=>({
     "Content-Type": "application/json",
     "Authorization": `Bearer ${token}`,
});


export const httpGet=(url,)=>{
    return axios.get(url,{
        headers:getHeaders(),
    })
}

export const httpPost=(url,body)=>{
    return axios.post(url,body,{
         headers:getHeaders(),
    })
}

export const httpPut=(url,body)=>{
    return axios.put(url,body,{
        headers:getHeaders()

    })
}
export const httpDelete=(url,)=>{
    return axios.delete(url,{
        headers:getHeaders()
    })

}