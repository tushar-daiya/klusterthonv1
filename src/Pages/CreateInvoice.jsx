import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import { ArrowLeft, MoveRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Dropdown from "../components/UI/Dropdown";
import InvoiceItem from "../components/UI/InvoiceItem";
import InvoicePreview from "../components/InvoicePreview";
import SendInvoiceModal from "../components/UI/SendInvoiceModal";
import toast from "react-hot-toast";
import {
  useCreateClientMutation,
  useCreateInvoiceMutation,
  useGetClientsQuery,
} from "../features/auth/authServices";
import { getDateAfterDays, getFormattedDate } from "../utils/utils";
import LoadingScreen from "../components/LoadingScreen";
import { TailSpin } from "react-loader-spinner";

function CreateInvoice() {
  const { isLoading, isSuccess, error, data } = useGetClientsQuery();
  const initialValues = {
    billTo: "",
    email: "",
    billingAddress: "",
    issuedOn: getFormattedDate(),
    paymentDue: getDateAfterDays(15),
    phone: "",
    note: "Thank You Have a great day",
    services: [
      {
        item: "",
        qty: 0,
        price: 0,
        itemId: 1,
      },
    ],
  };
  const [
    createInvoice,
    {
      isLoading: invoiceLoading,
      isSuccess: invoiceSuccess,
      error: invoiceError,
      data: invoiceData,
    },
  ] = useCreateInvoiceMutation();
  const [billDetails, setBillDetails] = useState(initialValues);

  const addMoreItem = () => {
    const newItem = {
      item: "",
      qty: "",
      price: "",
      itemId: billDetails.services.length + 1,
    };

    setBillDetails((prevState) => ({
      ...prevState,
      services: [...prevState.services, newItem],
    }));
  };
  const handleBillTo = (value) => {
    setBillDetails((prevState) => ({
      ...prevState,
      billTo: value.firstName + " " + value.lastName,
      email: value.email,
      billingAddress: value.billingAddress,
      phone: value.phone,
    }));
  };
  const handleAdditionalNote = (value) => {
    setBillDetails((prevState) => ({
      ...prevState,
      note: value,
    }));
  };
  const handleChange = (id, field, value) => {
    const updatedItems = billDetails.services.map((item) =>
      item.itemId === id ? { ...item, [field]: value } : item
    );

    setBillDetails((prevState) => ({
      ...prevState,
      services: updatedItems,
    }));
  };
  const deleteItem = (id) => {
    const updatedItems = billDetails.services.filter(
      (item) => id !== item.itemId
    );

    setBillDetails({
      ...billDetails,
      services: updatedItems,
    });
  };

  const sendInvoice = async () => {
    if (billDetails.billTo.length == 0) {
      toast.error("Please fill up all the fields");
      return;
    }
    if (totalPrice <= 50) {
      toast.error("Total Price must be greater than 50");
      return;
    }
    try {
      console.log(billDetails);

      const data = await createInvoice({
        ...billDetails,
        address: billDetails.billingAddress,
      }).unwrap();
      if (data?.success) {
        toast.success("Invoice Sent Successfully");
      }
      console.log(data);
      setBillDetails(initialValues);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const [modal, setModal] = useState(false);
  const totalPrice = useMemo(() => {
    let total = 0;
    billDetails.services.map((item) => (total += item.qty * item.price));
    return total;
  }, [billDetails.services]);
  return (
    <div>
      {isLoading && <div className="mt-5 w-full h-96 bg-white rounded-lg"><LoadingScreen /></div>}
      {error && error?.status === 400 && toast.error(error?.data?.message) && (
        <Navigate to="/clients" />
      )}
      {modal && <SendInvoiceModal toggleModal={() => setModal(false)} />}
      {isSuccess && data?.data && (
        <div className="relative mt-5 pb-5 bg-white rounded-xl">
          <div className="flex justify-between items-center px-5 py-8 border-b-2 border-solid border-greyBg">
            <div className="flex items-center gap-3">
              <Link to={"/invoices"}>
                <ArrowLeft />
              </Link>
              <h2 className="text-xl font-bold">Create Invoice</h2>
            </div>
            <p className="font-semibold text-sv-red text-sm">
              Please create a client account before sending an invoice
            </p>
          </div>
          <div className="flex justify-between m-8">
            <div className="w-[40%]">
              <div className="w-full border-b-2 border-solid border-greyBg">
                <Dropdown
                  clients={data?.data}
                  billTo={billDetails?.billTo}
                  setBillTo={handleBillTo}
                />
                <div className="w-full mt-5">
                  <p className="text-sm font-medium">
                    What are you paying for?
                  </p>
                  <div className="mt-2">
                    {billDetails?.services?.map((item) => (
                      <InvoiceItem
                        deleteItem={deleteItem}
                        item={item}
                        handleChange={handleChange}
                        id={item.itemId}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-2 mb-4 w-full">
                  <p
                    onClick={addMoreItem}
                    className="text-sm text-right font-semibold text-sv-red cursor-pointer"
                  >
                    Add another item?
                  </p>
                </div>
              </div>
              <div className="w-full mt-3">
                <p className="text-sm font-medium">Additional Note</p>
                <div className="mt-2">
                  <textarea
                    className="resize-none w-full border-2 border-solid border-greyBg rounded-2xl p-2 outline-none "
                    name="additionalNote"
                    rows={4}
                    value={billDetails?.note}
                    onChange={(e) => handleAdditionalNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={sendInvoice}
                  className="h-12 hover:bg-sv-red flex items-center justify-center hover:text-white transition-all w-full text-sv-red rounded-xl bg-sv-red-light"
                >
                  {invoiceLoading ? (
                    <TailSpin
                      height="32"
                      width="32"
                      color="#ffffff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    <span className="font-medium">Send Invoice</span>
                  )}
                </button>
              </div>
            </div>
            <div className="w-[58%] pointer-events-none">
              <h2 className="text-lg font-bold">Preview</h2>
              <InvoicePreview
                billTo={billDetails?.billTo}
                email={billDetails?.email}
                phone={billDetails?.phone}
                issuedOn={billDetails?.issuedOn}
                paymentDue={billDetails?.paymentDue}
                address={billDetails?.billingAddress}
                items={billDetails?.services}
                additional={billDetails?.note}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CreateInvoice;
