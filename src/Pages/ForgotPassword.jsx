import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailSubmit = async () => {
    let data = {
      email: email,
    };
    try {
      setLoading(true);
      const response = await axios.post(
      import.meta.env.VITE_BASE_URL+"auth/forgot-password",
        data
      );

      if (response?.data?.success) {
        setOtpSent(true);
        toast.success(response?.data?.msg);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordUpdate = async () => {
    let data = {
      email: email,
      otp: otp,
      newPassword: newPassword,
    };
    try {
      setLoading(true);
      const response = await axios.patch(
        import.meta.env.VITE_BASE_URL+"auth/reset-password",
        data
      );

      if (response?.data?.success) {
        toast.success(response?.data?.msg);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-2/3">
      <div>
        <h1 className="text-sv-xxl font-bold">Forgot Password</h1>
        <p className="text-sv-grey text-lg">Enter email to reset password.</p>
      </div>
      <div className="mt-10">
        <Input
          disabled={otpSent}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Enter Email"
          type="email"
        />
        {otpSent && (
          <div className="mt-5 gap-5 flex flex-col">
            <Input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              label="Enter OTP"
              type="text"
            />
            <Input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              label="Enter New Password"
              type="password"
            />
            <span
              onClick={handleEmailSubmit}
              className=" cursor-pointer text-sv-red font-medium ml-auto"
            >
              Resend Code
            </span>
          </div>
        )}
      </div>
      <div className="mt-5">
        <Button
          loading={loading}
          onClick={otpSent ? handlePasswordUpdate : handleEmailSubmit}
          text={otpSent ? "Update Password" : "Continue"}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
