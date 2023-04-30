import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { URL,auth_code } from "../../baseurl";
import Loader from "../components/common/Loader";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({
    email: false,
  });
  const validate = () => {
    let isValid = true;
    if (email === "") {
      setHasError((prevState) => ({ ...prevState, email: true }));
      isValid = false;
    } else {
      setHasError((prevState) => ({ ...prevState, email: false }));
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);
      axios({
        method: "post",
        url: `${URL}api/admin-forgot-password`,
        data: {
          email,
          auth_code,
        },
      })
        .then((response) => {
          setIsLoading(false);
          toast.success(response.data.message);
          //   navigate("/dashboard");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-[100vh]">
      <div className="p-5 w-fit">
        <h1 className="mx-[100px] font-bold text-2xl mb-5">Reset Password</h1>
        <p className="text-black/60 mb-5">
          The 4 digit OTP will be sent to entered email address
        </p>
        <div className="mb-3">
          <label htmlFor="ctnEmail">Email address</label>
          <input
            id="ctnEmail"
            type="email"
            name="email"
            value={email}
            placeholder="name@example.com"
            className="rounded-md w-[100%] p-2 border-black/20 border-2 outline-none focus:border-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          {hasError.email ? (
            <span className="text-danger text-sm font-semibold">Required</span>
          ) : (
            ""
          )}
        </div>
        <button
          value="verify"
          onClick={handleSubmit}
          className="text-center cursor-pointer bg-primary rounded-md w-[100%] py-2 text-white"
        >
          {isLoading ? <Loader /> : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default ResetPass;
