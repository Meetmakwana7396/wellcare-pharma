import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL, auth_code } from "../../baseurl";
import Loader from "../components/common/Loader";

const NewPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({
    password: false,
  });
  const validate = () => {
    let isValid = true;
    if (password === "") {
      setHasError((prevState) => ({ ...prevState, password: true }));
      isValid = false;
    } else {
      setHasError((prevState) => ({ ...prevState, password: false }));
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      axios({
        method: "post",
        url: `${URL}api/admin-reset-password`,
        data: {
          email: localStorage.getItem("EMAIL"),
          auth_code,
          new_password: password,
        },
      })
        .then((response) => {
          setPassword("");
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-[100vh]">
      <div className="p-5 w-fit">
        <h1 className="mx-[100px] font-bold text-2xl mb-5">Set New Password</h1>
        <p className="text-black/60 mb-5">
          Just an Healthy Reminder to make your password strong.
        </p>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="****"
            className="rounded-md w-[100%] p-2 border-black/20 border-2 outline-none focus:border-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between text-sm pt-1">
            {hasError.password ? (
              <span className="text-danger text-md font-semibold">
                Please Enter the Password
              </span>
            ) : (
              ""
            )}
            <span
              className={`cursor-pointer ${
                showPassword ? "" : "text-primary"
              } font-semibold`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>
        </div>
        <button
          value="verify"
          onClick={handleSubmit}
          className="text-center cursor-pointer bg-primary rounded-md w-[100%] py-2 mt-5 text-white"
        >
          {isLoading ? <Loader /> : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
