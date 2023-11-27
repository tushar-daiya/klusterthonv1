import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
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
}

export default Layout;
