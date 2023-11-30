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
        import.meta.env.VITE_BASE_URL+"auth/verify",
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

export default VerifyOTP;
