import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

function Input(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label className="text-sm">{props?.label}</label>
    <div className={`${
          props?.error && props?.touched
            ? "border-sv-red border-2"
            : "border-sv-grey border"
        } w-full items-center flex relative h-12 border-solid rounded-lg mt-1`}>

    
      <input
        disabled={props?.disabled}
        value={props?.value}
        onChange={props?.onChange}
        onBlur={props?.onBlur}
        name={props?.name}
        className={`w-full h-full p-3 outline-none rounded-lg`}
        type={props?.type === "password" ? (showPassword ? "text" : "password") : props?.type}
      />
        {props?.type === "password" && (
  showPassword ? (
    <Eye
      className="cursor-pointer mr-3"
      size={20}
      onClick={() => setShowPassword(!showPassword)}
    />
  ) : (
    <EyeOff
      className="cursor-pointer mr-3"
      size={20}
      onClick={() => setShowPassword(!showPassword)}
    />
  )
)}

        
      </div>

      {props?.touched && props?.error && (
        <p className="text-sv-red text-sm mt-1">{props?.error}</p>
      )}
    </div>
  );
}

export default Input;
