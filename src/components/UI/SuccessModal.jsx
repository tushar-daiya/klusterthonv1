import { Check } from 'lucide-react'
import React from 'react'

function SuccessModal({title,desc,buttonText,toggleModal}) {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-auto max-w-lg bg-white px-10 py-10 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <div className="h-14 w-14 bg-sv-green rounded-full flex justify-center items-center box-content border-[20px] border-solid border-green-50">
            <Check strokeWidth={3} color="white" size={40} />
            </div>
            <h2 className="text-lg text-sv-green font-semibold mt-4">{title}
            </h2>
            <p className="font-medium text-center my-7">{desc}</p>
            <button onClick={toggleModal} className="h-12 bg-sv-green text-white font-medium w-full rounded-xl">
                {buttonText}
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default SuccessModal