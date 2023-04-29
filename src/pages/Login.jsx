import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthBanner from "../components/common/AuthBanner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="container">
      <div className="h-screen md:flex">
        <AuthBanner
          title={"Welcome to WellcarePharma"}
          slogan="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, nam?"
        />

        <div className="h-fit mx-auto my-auto w-[350px]">
          <form className="bg-white border-primary p-10">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
             Admin Login
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-6">
              Welcome Back
            </p>

            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name=""
                id="floating_last_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_last_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type={showPassword ? "text" : "password"}
                name="floating_last_name"
                id="floating_last_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_last_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              <div className="text-right text-sm pt-1">
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
              type="submit"
              onClick={() => navigate("/dashboard")}
              className="block w-full bg-primary hover:opacity-80 mt-4 py-2.5 rounded-md text-white font-semibold mb-2"
            >
              Login
            </button>
            <span className="text-sm ml-2 hover:text-primary cursor-pointer">
              Forgot Password ?
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
