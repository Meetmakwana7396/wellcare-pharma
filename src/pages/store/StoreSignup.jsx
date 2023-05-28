import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { URL as url, uploadImage } from "../../../baseurl";
import AuthBanner from "../../components/common/AuthBanner";
import Loader from "../../components/common/Loader";
import { BiPlusCircle } from "react-icons/bi";

const defaultParams = {
  username: "",
  email: "",
  contact_no: "",
  address: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
  password: "",
  picture: "",
};

const StoreSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState(defaultParams);
  const [picture, setPicture] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    uploadImage(file)
      .then((data) => {
        // Handle successful response data
        setFormData({ ...formData, picture: data });
        setPicture(URL.createObjectURL(file));
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  function validateForm(formData) {
    const errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (
        (key === "contact_no" || key === "pincode") &&
        value &&
        isNaN(value)
      ) {
        errors[key] = `${key} cannot be string.`;
      } else if (value === "") {
        errors[key] = "This field is required.";
      }
    }
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      console.log(errors, "errors");
      setErrors(errors);
      return false;
    }
  }

  const handleSignup = () => {
    if (validateForm(formData)) {
      setisLoading(true);
      axios({
        method: "post",
        url: `${url}api/store-register`,
        data: {
          ...formData,
        },
      })
        .then((response) => {
          setFormData(defaultParams);
          localStorage.setItem("store_token", response.data.token);
          setisLoading(false);
        })
        .catch((error) => {
          setisLoading(false);
          toast.error(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    localStorage.getItem("store_token") ? navigate("/dashboard") : "";
  }, []);

  return (
    <div className="h-screen md:flex">
      <AuthBanner
        title={"Welcome to WellcarePharma"}
        slogan="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, nam?"
        bgcolor="bg-success"
      />

      <div className="h-screen mx-auto flex overflow-y-auto px-4 justify-center items-center">
        <div className="bg-white w-[450px] ">
          {" "}
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Store Signup
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-6">
            Signup to Store to get Started
          </p>
          <div className="mb-3">
            <label htmlFor="ctnEmail">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter Username"
              className="form-control"
              onChange={handleChange}
            />
            {errors.username && (
              <span className="text-danger text-sm font-semibold">
                {errors.username}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                className="form-control"
                onChange={handleChange}
              />
              {errors.email ? (
                <span className="text-danger text-sm font-semibold">
                  {errors.email}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contact_no">Contact No:</label>
              <input
                id="contact_no"
                type="text"
                name="contact_no"
                placeholder="##########"
                className="form-control"
                onChange={handleChange}
              />
              {errors.contact_no && (
                <span className="text-danger text-sm font-semibold">
                  {errors.contact_no}
                </span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="ctnEmail">Address:</label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter Your Address"
              className="form-control"
              onChange={handleChange}
            />
            {errors.address && (
              <span className="text-danger text-sm font-semibold">
                {errors.address}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-3">
              <label htmlFor="area">Area:</label>
              <input
                id="area"
                type="text"
                name="area"
                placeholder="Enter area"
                className="form-control"
                onChange={handleChange}
              />
              {errors.area && (
                <span className="text-danger text-sm font-semibold">
                  {errors.area}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ctnEmail">City:</label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Enter City"
                className="form-control"
                onChange={handleChange}
              />
              {errors.city && (
                <span className="text-danger text-sm font-semibold">
                  {errors.city}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ctnEmail">State:</label>
              <input
                id="state"
                type="text"
                name="state"
                placeholder="Enter state"
                className="form-control"
                onChange={handleChange}
              />
              {errors.state && (
                <span className="text-danger text-sm font-semibold">
                  {errors.state}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ctnEmail">Pincode:</label>
              <input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                className="form-control"
                onChange={handleChange}
              />
              {errors.pincode && (
                <span className="text-danger text-sm font-semibold">
                  {errors.pincode}
                </span>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-6">
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
              {errors.password && (
                <span className="text-danger text-md font-semibold">
                  {errors.password}
                </span>
              )}
              <span
                className={`cursor-pointer ${
                  showPassword ? "" : "text-success"
                } font-semibold`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "hide" : "show"}
              </span>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6">
            <label htmlFor="">Store Picture</label>
            <div className="flex items-center">
              <label
                htmlFor="store_image"
                className="h-20 w-20 mt-1 rounded border-black/10 border flex justify-center items-center cursor-pointer shadow-md"
              >
                <BiPlusCircle className="text-black/40" />
              </label>
              <input
                type="file"
                name="picture"
                id="store_image"
                className="hidden"
                value={picture || null}
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className={`block w-full bg-success hover:opacity-80 mt-4 py-2.5 rounded-md text-white font-semibold mb-2 ${
              isLoading ? "pointer-events-none opacity-80" : ""
            }`}
          >
            {isLoading ? <Loader /> : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreSignup;
