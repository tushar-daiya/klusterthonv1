import React, { useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import { Card, Typography } from "@material-tailwind/react";
import ActionMenu from "../components/UI/ActionMenu";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/UI/DeleteModal";
import LoadingScreen from "../components/LoadingScreen";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
} from "../features/auth/authServices";
import toast from "react-hot-toast";
import NoData from "../components/UI/NoData";
function Clients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { data, isLoading, isSuccess, error } = useGetClientsQuery();
  const [deleteClient, { isLoading: deleteLoading, isSuccess: deleteSuccess }] =
    useDeleteClientMutation();
  const TABLE_HEAD = ["User ID", "Name", "Email", "Phone", "Address", "Action"];
  const clients = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St, Cityville",
      userId: "JD12",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "9876543210",
      address: "456 Oak St, Townsville",
      userId: "JS34",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "5551234567",
      address: "789 Pine St, Villagetown",
      userId: "AJ56",
    },
    {
      name: "Bob Williams",
      email: "bob.williams@example.com",
      phone: "111-222-3333",
      address: "567 Birch St, Hamletville",
      userId: "BW78",
    },
    {
      name: "Eva Brown",
      email: "eva.brown@example.com",
      phone: "999-888-7777",
      address: "321 Cedar St, Boroughburg",
      userId: "EB90",
    },
  ];
  const handleDelete = async (id) => {
    try {
      const data = await deleteClient(id).unwrap();
      if (data?.success) {
        toast.success("Client Deleted Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setModal(false);
    }
  };
  const menuActions = [
    {
      name: "Edit Client Info",
      onClick: (id) => navigate(`/clients/edit/${id}`),
    },
    {
      name: "View Client Invoice",
      onClick: () => navigate("/clients/invoices"),
    },
    {
      name: "Delete Client",
      onClick: (id) => {
        setModal(true);
        setDeleteId(id);
      },
    },
  ];
  const [searchResults, setSearchResults] = useState(clients);
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  const handleSearch = () => {
    const results = clients.filter((client) =>
      Object.values(client).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults(results.length > 0 ? results : null);
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}

      {modal && (
        <DeleteModal
          loading={deleteLoading}
          title={"Delete Client?"}
          desc={
            "Proceeding with this action will delete this client, Continue?"
          }
          buttonText={"Delete"}
          id={deleteId}
          toggleModal={() => setModal(false)}
          handleClick={handleDelete}
        />
      )}
      {!isLoading && (
        <div>
          <div className="mt-10">
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/clients/create")}
                className="px-4 py-3 bg-sv-red rounded-lg text-white"
              >
                Create Client Info
              </button>
              <div className="flex items-center w-1/3 p-3 rounded-xl bg-white">
                <Search strokeWidth={1} />

                <input
                  className="outline-none w-full ml-2"
                  placeholder="Search by ID, Name, Email or Phone"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          {isSuccess&& data?.data&&(
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
                    (
                      {
                        firstName,
                        phone,
                        email,
                        billingAddress,
                        clientId,
                        _id,
                      },
                      index
                    ) => {
                      const classes = "p-4";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {clientId}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {firstName}
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
                              {phone}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {billingAddress}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <ActionMenu menuActions={menuActions} id={_id} />
                          </td>
                          {/* <td className={classes}>
                      <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      >
                        Edit
                        </Typography>
                      </td> */}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </Card>
          </div>

          )}
          {error && <NoData title={"Add clients info"} desc="No clients to display">
            <FileText size={64} />
            </NoData>}
        </div>
      )}
    </div>
  );
}

export default Clients;
