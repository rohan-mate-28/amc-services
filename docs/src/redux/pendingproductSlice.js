import { createSlice }  from "@reduxjs/toolkit";

const pendingproduct=createSlice({
      name:"pendingProduct",
      initialState:{
            PendingProduct:[],
            loadings:false
      },
      reducers:{
            setPendingProduct:(state,action)=>{
                  state.PendingProduct=action.payload
            },
            setloadings:(state,action)=>{
                  state.loadings=action.payload
            }

      }
});
export const {setPendingProduct,setloadings}=pendingproduct.actions;
export default pendingproduct.reducer;