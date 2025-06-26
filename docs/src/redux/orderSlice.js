import { createSlice } from "@reduxjs/toolkit";
 
 const orderSlice=createSlice({
      name:"order",
      initialState:{
            orders:[],
            Loading:false
      },
      reducers:{
            setOrder:(state,action)=>{
                  state.orders=action.payload;
            },
            setLoading:(state,action)=>{
                  state.Loading=action.payload;
            },
      },
 });
 export const {setLoading,setOrder}=orderSlice.actions;
 export default orderSlice.reducer;