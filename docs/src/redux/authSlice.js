import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      const payload = action.payload;
      if (!payload) {
        // treat as logged out fallback
        state.user = false;
        state.role = null;
        return;
      }
      state.user = payload;
      state.role = payload.role || null;
    },
    logout: (state) => {
      state.user = false;
      state.role = null;
    },
  },
});

export const { setloading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
