import { createSlice } from "@reduxjs/toolkit";

const INITAL_STATE={
    blog:[]
};
export const blogSlice = createSlice({
  name: "blog",
  initialState:INITAL_STATE,
  reducers: {
    setBlog:(state,action)=>{
        state.blog=action.payload
    },
    addBlog:(state,action)=>{
        state.blog.push(action.payload)
    },
    updateBlog:(state,action)=>{
      const index=state.blog.findIndex(i=>i.id===action.payload.id)
      state.blog[index]=action.payload
    },
    deleteBlog:(state,action)=>{
      state.blog = state.blog.filter(i=>i.id!==action.payload.id);
    }
  },
});

export const { setBlog,addBlog,updateBlog,deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;
