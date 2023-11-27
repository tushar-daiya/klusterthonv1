import React from "react";

function PaymentStatus({ status }) {
  return (
    <div
      className={
        status === "paid"
          ? "bg-sv-green-light text-sv-green w-max py-1 px-3 rounded-2xl"
          : "bg-sv-amber-light text-sv-amber w-max py-1 px-3 rounded-2xl"
      }
    >
      {status === "paid" ? "Paid" : "Pending"}
    </div>
  );
}

export default PaymentStatus;
