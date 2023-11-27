import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import { useGetInvoiceQuery } from "../features/auth/authServices";
import LoadingScreen from "../components/LoadingScreen";
import { ArrowLeft } from "lucide-react";

function ViewInvoice() {
  const params = useParams();
  const { data, isLoading, isSuccess, error } = useGetInvoiceQuery(params.id);

  return (
    <div>
      {isLoading && (
        <div className="mt-5 h-96 w-full">
          <LoadingScreen />
        </div>
      )}
      {isSuccess && data?.data && (
        <div className="mt-10 relative">
          <div className="absolute">
            <Link to={"/invoices"}>
              <ArrowLeft />
            </Link>
          </div>
          <div className="w-1/2 mx-auto ">
            <div className="w-full">
              {data?.data && (
                <InvoicePreview
                  recipient={false}
                  billTo={data?.data[0]?.billTo}
                  email={data?.data[0]?.email}
                  address={data?.data[0]?.address}
                  additional={data?.data[0]?.note}
                  items={data?.data[0]?.services}
                  totalPrice={data?.data[0]?.totalPrice}
                  phone={data?.data[0]?.phone}
                  issuedOn={data?.data[0]?.issuedOn.substring(0, 10)}
                  paymentDue={data?.data[0]?.paymentDue.substring(0, 10)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewInvoice;
