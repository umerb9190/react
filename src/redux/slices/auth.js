import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: "auth",
  initialState:{
    Authenticated:false,
    token:null,
  },
  reducers: {
    setAuth:(state,action)=>{
        state.Authenticated=true
        state.token=action.payload
    },
   
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
