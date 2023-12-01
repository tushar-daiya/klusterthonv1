import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
const initialState = {
  loading: false,
  token: Cookies.get("token")||null,
  uid: Cookies.get("uid")||null,
  user: null,
  error: null,
  success: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      Cookies.remove("token");
      Cookies.remove("uid");
      state.token = null;
      state.uid = null;
      state.user = null;
      state.error = null;
      state.success = false;
      
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      toast.dismiss();
      toast.loading("Signing up...");
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      toast.dismiss();
      toast.success("User created successfully!");
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.dismiss();
      toast.error(payload);
    },
    [userLogin.pending]: (state) => {
        state.loading = true
        state.error = null
        toast.dismiss();
      toast.loading("Logging in...");
      },
      [userLogin.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.user = payload.user
        state.token = payload.token
        state.uid = payload._id
        toast.dismiss();
        toast.success("Logged in successfully!");
      },
      [userLogin.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
        toast.dismiss();
        toast.error(payload);
      },
  },
});
export const { logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
