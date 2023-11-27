import { Trash, Trash2 } from "lucide-react";
import React from "react";

function InvoiceItem(props) {
  return (
    <div
      key={props.id}
      className="h-14 flex items-center pl-4 pr-2 w-full border-2 border-solid border-greyBg rounded-2xl mb-2"
    >
      <div className="w-1/2">
        <input
          value={props.item.name}
          onChange={(e) =>
            props.handleChange(props.id, "item", e.target.value)
          }
          className="w-full pr-2 outline-none border-r-2 border-solid border-greyBg"
          placeholder="Invoice Item"
          type="text"
        />
      </div>
      <div className="w-1/5 px-2">
        <input
          value={props.item.qty}
          onChange={(e) =>
            props.handleChange(props.id, "qty", e.target.value)
          }
          className="w-full outline-none border-r-2 border-solid border-greyBg"
          placeholder="Qty"
          type="number"
        />
      </div>
      <div className="w-1/5 px-2">
        <input
          value={props.item.price}
          onChange={(e) =>
            props.handleChange(props.id, "price", e.target.value)
          }
          className="w-full outline-none "
          placeholder="Price"
          type="number"
        />
      </div>
      <div className="w-[10%] flex items-center justify-center">
      <Trash2 onClick={()=>props.deleteItem(props.id)} color="rgba(239,0,0,1)" size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default InvoiceItem;
