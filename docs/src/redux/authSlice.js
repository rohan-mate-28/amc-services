import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    role: null,
  },
  reducers: {
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role || null; // extracted from API or use logic
    },
    logout(state) {
      state.user = false;
      state.role = null;
    },
  },
});

export const { setloading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
