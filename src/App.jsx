import React, { useEffect } from "react";
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
import { Cookie } from "lucide-react";
import { useGetUserDetailsQuery } from "./features/auth/authServices";
import { setUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { VerifyEmail, VerifyOTP } from "./Pages/VerifyEmail";
import ViewInvoiceWithoutLogin from "./Pages/ViewInvoiceWithoutLogin";
import StripeContainer from "./components/StripeContainer";
import PaymentSuccess from "./Pages/PaymentSuccess";

function App() {
  const dispatch = useDispatch();
  const skip = Cookies.get("uid") ? false : true;
  const { data, isLoading, error } = useGetUserDetailsQuery("userDetails");
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
  }, [data]);
  const { user } = useSelector((state) => state.auth);
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Cookie size={64} />
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        {!user && (
          <Route
            path="invoices/view/:id"
            element={!user && <ViewInvoiceWithoutLogin />}
          />
        )}
        {!user && <Route path="/payment" element={<StripeContainer />} />}        
        {!user && <Route path="/payment/success" element={<PaymentSuccess />} />}        

        <Route element={!user ? <Navigate to={"/auth/login"} /> : <Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="clients/*" element={<ClientRoutes />} />
          <Route path="invoices/*" element={<InvoiceRoutes />} />
        </Route>
        <Route
          path="auth/*"
          element={user ? <Navigate to={"/"} /> : <AuthRoutes />}
        />
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
      </Route>
    </Routes>
  );
}
function InvoiceRoutes() {
  console.log("hello");
  return (
    <Routes>
      <Route element={<InvoiceHeader />}>
        <Route index element={<Invoice />} />
        <Route path="/create" element={<CreateInvoice />} />
        <Route path="/view/:id" element={<ViewInvoice />} />
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
        <Route path="/edit/:id" element={<EditClient />} />
      </Route>
    </Routes>
  );
}

export default App;
