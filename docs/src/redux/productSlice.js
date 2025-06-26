import { createSlice } from "@reduxjs/toolkit";
 
const productSlice=createSlice({
      name:"product",
      initialState:{
            products:[],
            loading:false,
      },
      reducers:{
            setProducts:(state,action)=>{
                  state.products=action.payload
            },
            setLoading:(state,action)=>{
                  state.loading=action.payload
            }
      }
});
export const {setLoading,setProducts}=productSlice.actions;
export default productSlice.reducer;
