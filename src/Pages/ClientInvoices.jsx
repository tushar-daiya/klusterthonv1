import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useDeleteInvoiceMutation,
  useGetInvoiceByEmailQuery,
  useGetInvoiceQuery,
} from "../features/auth/authServices";
import { Card, Typography } from "@material-tailwind/react";
import PaymentStatus from "../components/UI/PaymentStatus";
import ActionMenu from "../components/UI/ActionMenu";
import DeleteModal from "../components/UI/DeleteModal";
import LoadingScreen from "../components/LoadingScreen";

function ClientInvoices() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const values = location.state;
    const [modal, setModal] = useState(false);  
  if (!values) {
    return <Navigate to="/client" />;
  }
  const { data, isLoading, isSuccess, error } = useGetInvoiceByEmailQuery(
    values.email
  );
  const TABLE_HEAD = [
    "Invoice No",
    "Billed To",
    "Email Address",
    "Issued On",
    "Payment Due",
    "Status",
    "Action",
  ];
  const [deleteId, setDeleteId] = useState("");

  const menuActions = [
    {
      name: "View Invoice",
      onClick: (id) =>
        navigate({ pathname: `/invoices/view/${id}`, target: "_blank" }),
    },

    {
      name: "Delete Invoice",
      onClick: (id) => {
        setDeleteId(id);
        setModal(true);
      },
    },
  ];
  const handleDelete = async (id) => {
    try {
      const data = await deleteInvoice(id).unwrap();
      if (data?.success) {
        toast.success("Invoice Deleted Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setModal(false);
    }
  };
  const [
    deleteInvoice,
    {
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      error: deleteError,
      data: deleteData,
    },
  ] = useDeleteInvoiceMutation();
  return (
    <div>
      {modal && (
        <DeleteModal
          loading={deleteLoading}
          id={deleteId}
          title={"Delete Invoice?"}
          desc={"Are you sure you want to delete this?"}
          buttonText={"Delete"}
          toggleModal={() => setModal(false)}
          handleClick={handleDelete}
        />
      )}
      <div className="relative mt-5 bg-white rounded-xl pt-5">
        <div className="m-5 flex gap-10 ">
          <Link to={"/clients"}>
            <ArrowLeft />
          </Link>
          <h2 className="text-sv-red text-lg font-semibold ">
            Invoices billed to {values.name}
          </h2>
        </div>
        <div className="mx-10 my-10 flex gap-20">
          <div>
            <p className="font-semibold text-sv-red font-lg">
              Personal Information
            </p>
            <div className="mt-2 border-b-2 border-greyBg border-solid w-full"></div>
            <div className="mt-2 flex flex-col gap-3">
              <p>{values.name}</p>
              <p>{values.email}</p>
              <p>{values.phone}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sv-red font-lg">
              Billing Information
            </p>
            <div className="mt-2 border-b-2 border-greyBg border-solid w-full"></div>
            <div className="mt-2">
              <p>{values.address}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg text-sv-red ml-5">
            Client Invoices
          </h2>
          <div className="mt-2 border-b-2 border-greyBg border-solid w-full"></div>
          {isLoading && <LoadingScreen />}
          {isSuccess && data?.data && (
            <div className="mt-5">
              <Card className="h-full w-full overflow-scroll shadow-none">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-greyBg  p-4">
                          <Typography
                            variant="small"
                            color="black"
                            className="font-semibold leading-none"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map(
                      ({
                        invoiceId,
                        billTo,
                        email,
                        issuedOn,
                        paymentDue,
                        status,
                        _id,
                      }) => {
                        console.log(_id);
                        const classes = "p-4";

                        return (
                          <tr key={_id}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {invoiceId}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {billTo}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {email}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {issuedOn.substring(0, 10)}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {paymentDue.substring(0, 10)}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <PaymentStatus status={status} />
                              </Typography>
                            </td>
                            <td className={classes}>
                              <ActionMenu menuActions={menuActions} id={_id} />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientInvoices;
