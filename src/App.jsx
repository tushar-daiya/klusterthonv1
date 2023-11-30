import React, { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { useGetUserDetailsQuery } from "./features/auth/authServices";
import { setUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Auth from "./Pages/Auth";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import CreateClient from "./Pages/CreateClient";
import CreateInvoice from "./Pages/CreateInvoice";
import ViewInvoice from "./Pages/ViewInvoice";
import ClientHeader from "./components/UI/ClientHeader";
import EditClient from "./Pages/EditClient";
import InvoiceHeader from "./components/UI/InvoiceHeader";
import Invoice from "./Pages/Invoice";
import Layout from "./components/Layout";
import VerifyEmail from "./Pages/VerifyEmail";
import VerifyOTP from "./Pages/VerifyOTP";
import StripeContainer from "./components/StripeContainer";
import ClientInvoices from "./Pages/ClientInvoices";
import ViewInvoiceWithoutLogin from "./Pages/ViewInvoiceWithoutLogin";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserDetailsQuery("userDetails");
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
  }, [data]);
  const { user } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-red-500 p-4">
          <RefreshCcw className="w-12 h-12 text-red-500" />
        </div>
        <p className="mt-4 text-lg text-gray-800">Loading... Please wait.</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!user && (
          <Route
            path="invoices/view/:id"
            element={!user && <ViewInvoiceWithoutLogin />}
          />
        )}
        {!user && <Route path="/payment" element={<StripeContainer />} />}

        <Route
          element={
            !user ? (
              <Navigate to={"/auth/login/"} />
            ) : (
              <Layout />
            )
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="clients/*" element={<ClientRoutes />} />
          <Route path="invoices/*" element={<InvoiceRoutes />} />
        </Route>
        <Route
          path="auth/*"
          element={
            user ? (
              <Navigate to={"/"} />
            ) : (
              <AuthRoutes />
            )
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthRoutes() {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="verify" element={<VerifyOTP />} />
        <Route path="verify-email" element={<VerifyEmail />} />

        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to={"/auth/login"} />} />
      </Route>
    </Routes>
  );
}
function InvoiceRoutes() {
  return (
    <Routes>
      <Route element={<InvoiceHeader />}>
        <Route index element={<Invoice />} />
        <Route path="/create" element={<CreateInvoice />} />
        <Route path="/view/:id" element={<ViewInvoice />} />
        <Route path="*" element={<Navigate to={"/invoices"} />} />
      </Route>
    </Routes>
  );
}
function ClientRoutes() {
  return (
    <Routes>
      <Route element={<ClientHeader />}>
        <Route index element={<Clients />} />
        <Route path="/create" element={<CreateClient />} />
        <Route path="/invoices/:id" element={<ClientInvoices />} />
        <Route path="/edit/:id" element={<EditClient />} />
        <Route path="*" element={<Navigate to={"/clients"} />} />
      </Route>
    </Routes>
  );
}

export default App;