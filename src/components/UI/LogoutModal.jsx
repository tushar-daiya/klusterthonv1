import { Check } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { authApi } from "../../features/auth/authServices";

function LogoutModal({toggleModal}) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-auto max-w-lg bg-white px-10 py-10 rounded-xl">
          <div className="flex flex-col items-center justify-center mt-5 gap-5">
            
            <h2 className="text-lg font-semibold ">Do you want to log out?
            </h2>
            <button onClick={()=>{dispatch(logoutUser())
            dispatch(authApi.util.resetApiState())
            }} className="h-12 bg-sv-red text-white font-medium w-full rounded-xl">
                Yes, log out
            </button>
            <button onClick={toggleModal} className="h-12 bg-sv-grey text-white font-medium w-full rounded-xl">
                Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default LogoutModal;
