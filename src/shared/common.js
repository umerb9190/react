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

export const httpPost=(url,token,body)=>{
    return axios.post(url,body,{
         headers:getHeaders(token),
    })
}

export const httpPut=(url,token,body)=>{
    return axios.put(url,body,{
        headers:getHeaders(token)

    })
}
export const httpDelete=(url,token)=>{
    return axios.delete(url,{
        headers:getHeaders(token)
    })

}