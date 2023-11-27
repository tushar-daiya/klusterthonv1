import React, { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
function Login() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email address is required"),
      password: Yup.string()
        .required("Password is required")
    }),
    onSubmit: async (values) => {
      dispatch(userLogin(values));
      // setIsSubmitting(true);
      // try {
      //   const response = await axios.post(
      //     "https://klusterthon-project67.onrender.com/api/v1/user/login",
      //     values
      //   );
      //   if (response?.data?.success) {
      //     Cookies.set("token", response?.data?.data?.token);
      //     toast.success(response?.data?.msg);
      //     setTimeout(() => {
      //       navigate("/")
      //     }, 1000);
      //   } else {
      //     toast.error(response?.data?.msg);
      //   }
      // } catch (error) {
      //   console.log(error)
      //   if (error?.response) {
      //     toast.error(error?.response?.data.message);
      //   }
      //   console.log(error?.response?.data.message);
      // } finally {
      //   setIsSubmitting(false);
      // }
    },
  });
  return (
    <div className="w-2/3">
      <div>
        <h1 className="text-sv-xxl font-bold">Login To Resume</h1>
        <p className="text-sv-grey text-lg">
        Login to get access to your dashboard
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-10 flex flex-col gap-5">
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
          <div className="flex justify-between mb-2">
            <Link to={'/auth/verify-email'}>
              <p className="font-medium">Verify Email</p>
              </Link>
            <Link to={"/auth/forgot-password"}>
              <p className="text-sv-red font-medium">Forgot Password?</p>
            </Link>
          </div>
          <Button loading={loading} type="submit" text="Login" />
          <p className="text-center mt-2">
            Don't have an account?
            <Link to={"/auth/signup"}>
              <span className="text-sv-red ml-2 font-medium">Sign up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
