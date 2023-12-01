import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../features/auth/authServices";
import { RefreshCcw } from "lucide-react";
import { setUser } from "../features/auth/authSlice";

function Layout() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserDetailsQuery("userDetails");
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
  }, [data]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-red-500 p-4">
          <RefreshCcw className="w-12 h-12 text-red-500" />
        </div>
        <p className="mt-4 text-lg text-gray-800">Loading... Please wait.</p>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <div className="w-1/5 flex items-center justify-center bg-[rgba(23,23,23,1)] h-screen py-10">
          <Sidebar />
        </div>
        <div className="w-4/5 h-screen overflow-y-scroll px-8 py-4 bg-greyBg">
          <Outlet />
        </div>
      </div>
    );
  }}


export default Layout;
