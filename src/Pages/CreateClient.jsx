import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SuccessModal from "../components/UI/SuccessModal";
import { useCreateClientMutation } from "../features/auth/authServices";
function CreateClient() {
  const [addNewClient, { isLoading , isSuccess }] = useCreateClientMutation()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      billingAddress: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email address is required"),
        phone: Yup.string().required("Phone Number is required"),
        billingAddress: Yup.string().required("Address is required"),
    }),
    onSubmit: async(values) => {
      try {
        const data=await addNewClient(values).unwrap()
        if(data?.success){
          toggleModal()
        }
        formik.resetForm();
        
      } catch (error) {
      }
    },
  });
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
  return (
    <div>
      {modal&& <SuccessModal toggleModal={toggleModal} title={"Client Creation Successful!"} desc="Congratulations, you have successfully created a new client, you can start sending invoice" buttonText="Continue" />}
      <div className="relative mt-5 bg-white rounded-xl py-10">
      <div className="absolute top-10 left-10">
        <Link to={'/clients'}>
        <ArrowLeft />
        </Link>
        </div>
        <div className="w-1/2 mx-auto">
          <div>
            <h2 className="text-xl font-bold">Create Client Info</h2>
            <p className="text-sv-grey">Fill client’s basic information</p>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-10 flex flex-col gap-5">
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  touched={formik.touched.firstName}
                  error={formik.errors.firstName}
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  touched={formik.touched.lastName}
                  error={formik.errors.lastName}
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  touched={formik.touched.email}
                  error={formik.errors.email}
                  name="email"
                  label="Email Address"
                  type="email"
                />
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  touched={formik.touched.phone}
                  error={formik.errors.phone}
                  name="phone"
                  label="Phone Number"
                  type="text"
                />
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.billingAddress}
                  touched={formik.touched.billingAddress}
                  error={formik.errors.billingAddress}
                  name="billingAddress"
                  label="Billing Address"
                  type="text"
                />
              </div>
              <div className="mt-10">
                <Button loading={isLoading} type="submit" text="Save Client Info" />
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateClient;
