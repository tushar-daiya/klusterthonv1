import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    let data = {
      otp: code,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "https://klusterthon-project67.onrender.com/api/v1/auth/verify",
        data
      );
      if (response?.data?.success) {
        toast.success(response?.data?.msg);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      } else {
        toast.error(response?.data?.msg);
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
        <h1 className="text-sv-xxl font-bold">Verify Email</h1>
        <p className="text-sv-grey text-lg">
          A six digit code has been sent to your email.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <Input
          onChange={(e) => setCode(e.target.value)}
          label="Enter Code"
          type="text"
        />
      </div>
      <div className="mt-10">
        <Button loading={loading} onClick={handleSubmit} text="Sign Up" />
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to={"/auth/login"}>
            <span className="text-sv-red ml-2 font-medium">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailSubmit = async () => {
    let data = {
      email: email,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "https://klusterthon-project67.onrender.com/api/v1/auth/verify-otp",
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
  const handleOTPSubmit = async () => {
    let data = {
      otp: otp,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "https://klusterthon-project67.onrender.com/api/v1/auth/verify",
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
        <h1 className="text-sv-xxl font-bold">Verify Email</h1>
        <p className="text-sv-grey text-lg">Enter email to verify.</p>
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
          onClick={otpSent ? handleOTPSubmit : handleEmailSubmit}
          text={otpSent ? "Verify Email" : "Continue"}
        />
      </div>
    </div>
  );
}

export { VerifyOTP, VerifyEmail}
