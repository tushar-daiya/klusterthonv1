import { ThumbsUp } from "lucide-react";
import React from "react";

function SendInvoiceModal({ toggleModal }) {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-auto max-w-lg w-full bg-white px-10 py-10 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <ThumbsUp strokeWidth={3} className="text-sv-amber" size={40} />

            <p className="font-medium text-center text-lg my-7">Invoice sent</p>
            <button
              onClick={toggleModal}
              className="h-12 bg-sv-green text-white font-medium w-full rounded-xl"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default SendInvoiceModal;
