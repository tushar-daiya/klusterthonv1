import React from "react";
import InvoiceItemTable from "./UI/InvoiceItemTable";
import { MoveRight } from "lucide-react";
import { convertToReadableFormat } from "../utils/utils";

function InvoicePreview({billTo,email,address, additional, items, totalPrice , phone, issuedOn, paymentDue, title,action,recipient,status}) {
  return (
    <div className="w-full">
      <div className="mt-6 p-5 flex justify-between border-2 border-solid border-greyBg rounded-2xl">
        <div>
          <h3 className="text-xl font-bold text-sv-red">Invoice</h3>
          <p className="text-sm mt-4 text-sv-grey">Billed To:</p>
          {billTo.length > 0 ? (
            <div className="mt-2 h-20">
              <p className="font-semibold text-sv-red">{billTo}</p>
              <div className="mt-2 text-xs">
                <p>{phone}</p>
                <p>{email}</p>
                <p>{address}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-between text-right">
          {billTo.length > 0 ? (
            <div className="h-20 mt-auto text-xs flex flex-col justify-between">
              <div>
                <p>Issued On</p>
                <p>{convertToReadableFormat(issuedOn)}</p>
              </div>
              <div>
                <p>Payment Due</p>
                <p>{convertToReadableFormat(paymentDue)}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mx-4 my-14">
        <InvoiceItemTable items={items} />
      </div>
      <div className="mt-6 p-5 flex justify-between border-2 border-solid border-greyBg rounded-2xl">
        <div>
          <p className="text-sm text-sv-red font-semibold">Additional Note</p>
          <div className="mt-2">
            <p className="text-xs">{additional}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 w-1/2 py-4 px-6 ml-auto border-2 border-solid border-greyBg rounded-2xl">
        <div className="flex justify-between">
          <p>Total (NG)</p>
          <p className="font-bold">{totalPrice}</p>
        </div>
        <div className=" my-2 border-b-2 border-solid border-greyBg"></div>
        {status==="paid"&&<p className="text-sv-green font-semibold">Paid</p>}
        {recipient&&status==="pending"&&<button onClick={action} className="w-full flex justify-between">
          <p className="text-sv-red font-semibold">{title}</p>
          <MoveRight color="rgba(239,0,0,1)" />
        </button>}
      </div>
    </div>
  );
}

export default InvoicePreview;
