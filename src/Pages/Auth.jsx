import React from "react";
import BackgroundImage from "../components/UI/BackgroundImage";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function Auth() {
  return (
    <div className="h-screen flex">
      
      <div className="w-1/2 flex justify-center items-center">
        <Outlet />
      </div>
      <div className="w-1/2">
        <BackgroundImage/>
      </div>
    </div>
  );
}

export default Auth;
