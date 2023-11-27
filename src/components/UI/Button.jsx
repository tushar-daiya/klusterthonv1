import React from "react";
import {  TailSpin } from "react-loader-spinner";

function Button(props) {
  
  return (
    <button
      disabled={props.loading}
      type={props.type}
      onClick={props.onClick}
      className="bg-sv-red flex items-center justify-center w-full h-14 text-lg text-white rounded-xl font-medium"
    >
      {props.loading ? (
        <TailSpin
        height="32"
        width="32"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      ) : (
        props.text
      )}
    </button>
  );
}

export default Button;
