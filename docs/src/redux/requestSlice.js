import  { createSlice } from "@reduxjs/toolkit";
 
const requestSlice=createSlice({
      name:"request",
      initialState:{
            requests:[],
            loading:false,
      },
      reducers:{
            setRequest:(state,action)=>{
                  state.requests=action.payload
            },
            setloading:(state,action)=>{
                  state.loading=action.payload
            },

      }
})
export const {setRequest,setloading}=requestSlice.actions;
export default requestSlice.reducer;