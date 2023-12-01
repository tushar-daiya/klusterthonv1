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
  const { token, uid } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="auth/*"
          element={!token && !uid ? <AuthRoutes /> : <Navigate to={"/"} />}
        />
        <Route
          path="invoice/view/:id"
          element={
            !token && !uid ? <ViewInvoiceWithoutLogin /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/payment"
          element={!token && !uid ? <StripeContainer /> : <Navigate to={"/"} />}
        />
        <Route
          element={token && uid ? <Layout /> : <Navigate to={"auth/login"} />}
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="clients/*" element={<ClientRoutes />} />
          <Route path="invoices/*" element={<InvoiceRoutes />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
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
