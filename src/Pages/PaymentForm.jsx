import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import Button from "../components/UI/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ values, clientSecret }) {
    const navigate=useNavigate()
  const updatePayment = async ({ transactionId, status }) => {
    try {
      let temp = {
        transactionId: transactionId,
        email: values.email,
        amount: values.amount,
        invoiceId: values.invoiceId,
        status: status,
      };
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL+"transaction/verify",
        temp
      );
      console.log(res);
      if (res.data.success) {
        toast.success("Payment Successful");
        navigate("/invoices/view/"+values._id)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "white" }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  }
  const [errorMsg, setErrorMsg] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  
  async function paymentHandler(e) {
    e.preventDefault();
    setErrorMsg("");
    if (!stripe || !elements ) {
      return;
    }
    else {
      
      try {
        setProcessing(true);
        await stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          })
          .then(async({ paymentIntent }) => {
            await updatePayment({
              transactionId: paymentIntent.id,
              status: paymentIntent.status,
            });
            setErrorMsg(false);
            setProcessing(false);
            setSuccess(true);
          })
          .catch((error) => {
            toast.error("something went wrong");
            setErrorMsg(error.message);
            setProcessing(false);
            setSuccess(false);
          });
      } 
      catch (error) {
        console.log(error);
        toast.error("something went wrong")
      }
      finally{
        setProcessing(false);
      }
    }
  }

  return (
    <div>
      <form className="max-w-lg px-5 mx-auto mt-10" onSubmit={paymentHandler}>
        <div className="p-5 items-center bg-blue-500 rounded-xl">
        <CardElement options={CARD_OPTIONS}/>

        </div>
        <div className="mt-5">
        <Button type="submit" loading={processing} disabled={!stripe || !elements || processing || success} text="Pay Now"/>

        </div>
      </form>
    </div>
  );
}
