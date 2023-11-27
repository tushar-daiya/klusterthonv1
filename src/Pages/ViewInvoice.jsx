import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import { useGetInvoiceQuery } from "../features/auth/authServices";
import LoadingScreen from "../components/LoadingScreen";

function ViewInvoice() {
  console.log("view invoice");
  const params = useParams();
  const { data, isLoading, isSuccess, error } = useGetInvoiceQuery(params.id);

  
  return (
    <div>
      {isLoading && <LoadingScreen />}
      {isSuccess && data?.data && (
        <div className="w-1/2 mx-auto ">
          <div className="w-full">
            {/* <button
              className="h-12 hover:bg-sv-red hover:text-white transition-all w-full text-sv-red rounded-xl bg-sv-red-light mt-10"
            >
              <span className="font-medium">Send Invoice</span>
            </button> */}
            {data?.data && <InvoicePreview recipient={false} billTo={data?.data[0]?.billTo} email={data?.data[0]?.email} address={data?.data[0]?.address} additional={data?.data[0]?.note} items={data?.data[0]?.services} totalPrice={data?.data[0]?.totalPrice}  phone={data?.data[0]?.phone} issuedOn={data?.data[0]?.issuedOn.substring(0,10)} paymentDue={data?.data[0]?.paymentDue.substring(0,10)} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewInvoice;
