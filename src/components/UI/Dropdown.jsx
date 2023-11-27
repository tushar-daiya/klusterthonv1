import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

function Dropdown(props) {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div >
        <p className='text-sm font-medium'>Bill To</p>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="relative cursor-pointer mt-2 bg-white border-2 border-solid border-greyBg h-14 rounded-2xl w-full"
      >
      <div className="flex items-center justify-between w-full rounded-2xl px-4">
        <p>{props.billTo.length>0 ? props.billTo: "Enter name or email"}</p>
        {isOpen ? (
            <ChevronDown className="ml-auto transform transition-all rotate-180" />
            ) : (
                <ChevronDown className="ml-auto transition-all" />
                )}
      </div>

      <div
        className={`${
            isOpen ? "" : "hidden"
        } absolute bg-white z-10 top-14 max-h-48 overflow-y-scroll w-full rounded-md min-w-[150px]`}
        >
        <div className="p-1 border-2 border-greyBg border-solid w-full rounded-md">
          {props?.clients.map(({firstName,lastName , email ,billingAddress,phone }) => 
            (
              <button
              onClick={() => props.setBillTo({firstName,lastName, email,billingAddress,phone})}
              className="w-full px-2 py-1 hover:bg-greyBg text-start rounded-md "
              >
              {firstName}-{email}
            </button>
          ))}
        </div>
      </div>
    </button>
</div>
  )
}

export default Dropdown