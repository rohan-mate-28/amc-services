import { createSlice } from "@reduxjs/toolkit";

const amcOrderSlice = createSlice({
  name: "amcOrder",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAMCOrders: (state, action) => {
      state.orders = action.payload;
    },
    setAMCOrderLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAMCOrderError: (state, action) => {
      state.error = action.payload;
    },
    confirmOrderSuccess: (state, action) => {
      const index = state.orders.findIndex(o => o._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    }
  },
});

export const {
  setAMCOrders,
  setAMCOrderLoading,
  setAMCOrderError,
  confirmOrderSuccess,
} = amcOrderSlice.actions;

export default amcOrderSlice.reducer;
