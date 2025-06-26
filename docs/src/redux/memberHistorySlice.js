 import { createSlice } from "@reduxjs/toolkit";

const memberHistorySlice = createSlice({
  name: "memberHistory",
  initialState: {
    loading: false,
    error: null,
    records: [],
  },
  reducers: {
    setMemberHistoryLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMemberHistoryRecords: (state, action) => {
      state.records = action.payload;
    },
    setMemberHistoryError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMemberHistoryLoading,
  setMemberHistoryRecords,
  setMemberHistoryError,
} = memberHistorySlice.actions;

export default memberHistorySlice.reducer;
