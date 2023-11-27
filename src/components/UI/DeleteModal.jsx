import { AlertTriangle } from "lucide-react";
import React from "react";
import { TailSpin } from "react-loader-spinner";

function DeleteModal({
  title,
  desc,
  buttonText,
  toggleModal,
  handleClick,
  id,
  loading,
}) {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-auto max-w-lg w-full bg-white px-10 py-10 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <div className="text-sv-red">
              <AlertTriangle strokeWidth={3} size={40} />
            </div>
            <h2 className="text-lg text-sv-red font-semibold mt-4">{title}</h2>
            <p className="font-medium text-center my-7">{desc}</p>
            <button
              disabled={loading}
              onClick={toggleModal}
              className="h-12 bg-sv-grey text-white font-medium w-full rounded-xl"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={() => handleClick(id)}
              className="h-12 mt-4 bg-sv-red text-white font-medium w-full rounded-xl flex justify-center items-center"
            >
              {loading ? (
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
                buttonText
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default DeleteModal;
