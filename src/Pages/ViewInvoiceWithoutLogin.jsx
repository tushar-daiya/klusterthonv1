import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
import InvoicePreview from "../components/InvoicePreview";

function ViewInvoiceWithoutLogin() {
  const params = useParams();
  console.log(params);
  const navigate=useNavigate()
  
  const [isLoading, setIsLoading] = useState(true);
  const [error,setError]=useState(false)
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
        console.log('hello')
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL+"invoice/recipient?_id=" +
          params.id
      );
      const data = await res.data;
      if (data?.success) {
        setData(data);
        console.log(data)
        setIsLoading(false);

      }
    } catch (error) {
        toast.error("Something went wrong");
    }
    finally{
        setIsLoading(false)
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
  const action = () => {
    let values={
        email:data.data[0].email,
        amount:data.data[0].totalPrice,
        invoiceId:data.data[0].invoiceId,
        currency:'gbp',
        _id:params.id
    }
    navigate("/payment", { state: values });
    
  };
  return (
    <div className="w-full min-h-screen bg-greyBg">
      {isLoading && <div className="h-screen"><LoadingScreen /></div>}
      { data?.data && (
        <div className="md:w-1/2 max-w-xl py-10 w-full mx-auto ">
          <div className="w-full">
            {/* <button
              className="h-12 hover:bg-sv-red hover:text-white transition-all w-full text-sv-red rounded-xl bg-sv-red-light mt-10"
            >
              <span className="font-medium">Download Invoice</span>
            </button> */}
            {data?.data && <InvoicePreview recipient={true} billTo={data?.data[0]?.billTo} email={data?.data[0]?.email} address={data?.data[0]?.address} additional={data?.data[0]?.note} items={data?.data[0]?.services} totalPrice={data?.data[0]?.totalPrice}  phone={data?.data[0]?.phone} issuedOn={data?.data[0]?.issuedOn.substring(0,10)} paymentDue={data?.data[0]?.paymentDue.substring(0,10)} title={"Click here to pay"} status={data?.data[0]?.status} action={action} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewInvoiceWithoutLogin;
