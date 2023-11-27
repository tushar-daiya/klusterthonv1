import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authActions";
function SignUp() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email address is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be 8 characters long"),
    }),
    onSubmit: (values) => {
      try {
        dispatch(registerUser(values));
      } catch (error) {
      }
    },
  });
  if (success) {
    navigate("/auth/verify");
  }
  return (
    <div className="w-2/3">
      <div>
        <h1 className="text-sv-xxl font-bold">Sign Up to Get Started</h1>
        <p className="text-sv-grey text-lg">
          Sign up to get access to your purchased course.
        </p>
      </div>
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
            value={formik.values.password}
            touched={formik.touched.password}
            error={formik.errors.password}
            name="password"
            label="Password"
            type="password"
          />
        </div>
        <div className="mt-10">
          <Button loading={loading} type="submit" text="Continue" />
          <p className="text-center mt-2">
            Already have an account?
            <Link to={"/auth/login"}>
              <span className="text-sv-red ml-2 font-medium">Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
