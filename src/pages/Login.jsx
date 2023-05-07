import React, { useEffect, useState } from "react";
import { URL, auth_code } from "../../baseurl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthBanner from "../components/common/AuthBanner";
import Loader from "../components/common/Loader";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [hasError, setHasError] = useState({
    email: false,
    password: false,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let isValid = true;
    if (formData.email === "") {
      setHasError((prevState) => ({ ...prevState, email: true }));
      isValid = false;
    } else {
      setHasError((prevState) => ({ ...prevState, email: false }));
    }

    if (formData.password === "") {
      setHasError((prevState) => ({ ...prevState, password: true }));
      isValid = false;
    } else {
      setHasError((prevState) => ({ ...prevState, password: false }));
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validate()) {
      setisLoading(true);
      axios({
        method: "post",
        url: `${URL}api/admin-login`,
        data: {
          ...formData,
          auth_code,
        },
      })
        .then((response) => {
          setFormData({ ...formData, email: "", password: "" });
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
          setisLoading(false);
        })
        .catch((error) => {
          setisLoading(false);
          toast.error(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    localStorage.getItem("token") ? navigate("/dashboard") : "";
  }, []);

  return (
    <div className="container">
      <div className="h-screen md:flex">
        <AuthBanner
          title={"Welcome to WellcarePharma"}
          slogan="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, nam?"
        />

        <div className="h-fit mx-auto my-auto w-[350px]">
          <div className="bg-white border-primary p-10">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Admin Login
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-6">
              Welcome Back
            </p>
            <div className="mb-3">
              <label htmlFor="ctnEmail">Email address</label>
              <input
                id="ctnEmail"
                type="email"
                name="email"
                placeholder="name@example.com"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
              {hasError.email ? (
                <span className="text-danger text-sm font-semibold">
                  Required
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="****"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                />
                <div className="flex justify-between text-sm pt-1">
                  {hasError.password ? (
                    <span className="text-danger text-md font-semibold">
                      Required
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
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className={`block w-full bg-primary hover:opacity-80 mt-4 py-2.5 rounded-md text-white font-semibold mb-2 ${
                isLoading ? "pointer-events-none opacity-80" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Login"}
            </button>
            <Link
              className="text-sm ml-2 hover:text-primary cursor-pointer"
              to="/reset-password"
            >
              Forgot Password ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
