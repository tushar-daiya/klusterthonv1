import React, { useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import { Card, Typography } from "@material-tailwind/react";
import ActionMenu from "../components/UI/ActionMenu";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/UI/DeleteModal";
import PaymentStatus from "../components/UI/PaymentStatus";
import { useDeleteInvoiceMutation, useGetInvoicesQuery } from "../features/auth/authServices";
import LoadingScreen from "../components/LoadingScreen";
import toast from "react-hot-toast";
import NoData from "../components/UI/NoData";
function Invoice() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const { data, isLoading, isSuccess, error } = useGetInvoicesQuery();
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
      onClick: (id) => navigate({ pathname: `/invoices/view/${id}`,target:"_blank" }),
    },

    {
      name: "Delete Invoice",
      onClick: (id) => {
        setDeleteId(id);
        setModal(true)},
    },
  ];
  

  
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    setSearchResults(data?.data);
  }, [data]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const results = data?.data.filter((invoice) => {
      return Object.values(invoice).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm)
      );
    });
  
    setSearchResults(results);
  };
  // useEffect(() => {
  //   handleSearch();
  // }, [searchTerm]);
  // const handleSearch = () => {
  //   const results = invoices.filter((invoice) =>
  //     Object.values(invoice).some((value) =>
  //       value.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  //   console.log(results);
  //   setSearchResults(results.length > 0 ? results : null);
  // };
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
const [deleteInvoice, { isLoading:deleteLoading, isSuccess:deleteSuccess,error:deleteError,data:deleteData }]=useDeleteInvoiceMutation();
  return (
    <div>
      {isLoading && <LoadingScreen />}
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
      {!isLoading && (
        <div>
          <div className="mt-10">
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/invoices/create")}
                className="px-4 py-3 bg-sv-red rounded-lg text-white"
              >
                Create Invoice
              </button>
              <div className="flex items-center w-1/3 p-3 rounded-xl bg-white">
                <Search strokeWidth={1} />

                <input
                  className="outline-none w-full ml-2"
                  placeholder="Search by Invoice No, Email, Billed To, or Issued On"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          {isSuccess && searchResults && (
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
                    {searchResults?.map(
                      (
                        {
                          invoiceId,
                          billTo,
                          email,
                          issuedOn,
                          paymentDue,
                          status,
                          _id,
                        },
                        
                      ) => {
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
                              <ActionMenu
                                menuActions={menuActions}
                                id={_id}
                              />
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
          {error && (
            <NoData title={"No Invoices"} desc={"You have no invoices yet."}>
              <FileText size={64} />
            </NoData>
          )}
        </div>
      )}
    </div>
  );
}

export default Invoice;
