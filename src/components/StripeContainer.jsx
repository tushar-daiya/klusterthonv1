import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import PaymentForm from "../Pages/PaymentForm";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import toast from "react-hot-toast";

const PUBLIC_KEY =import.meta.env.VITE_STRIPE_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const values = location.state;

  useEffect(() => {
    const getClientSecret = async () => {
      let { _id, ...rest } = values;
      try {
        setLoading(true);
        const res = await axios.post(
          import.meta.env.VITE_BASE_URL+"transaction/",
          rest
        );
        const data = await res.data;
        if (data?.success) {
          setClientSecret(data?.data?.data?.clientSecret);
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    if (values) {
      getClientSecret();
    } else {
      toast.error("No payment request found");
    }
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {clientSecret && (
        <Elements stripe={stripeTestPromise} options={{ clientSecret }}>
          <PaymentForm values={values} clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}
