 
import { createSlice } from "@reduxjs/toolkit";

const memberSlice=createSlice({
      name:"members",
      initialState:{
            Members:[],
            Loading:false,
            Error:null,
      },
      reducers:{
            setMembers:(state,action)=>{
                  state.Members=action.payload
             },
             setLoading:(state,action)=>{
                  state.Loading=action.payload
             },
             setError:(state,action)=>{
                  state.Error=action.payload
             }
      }
});
export const {setLoading,setMembers,setError}=memberSlice.actions;
export default memberSlice.reducer;