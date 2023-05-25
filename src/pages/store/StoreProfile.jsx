import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { URL as url, auth_code, uploadImage } from "../../../baseurl";
import Loader from "../../components/common/Loader";
import StoreMain from "../../components/common/store/StoreMain";

const StoreProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [profile_pic, setprofile_pic] = useState("");
  const [profileDetails, setProfileDetails] = useState({
    user_name: "",
    email: "",
    contact_number: "",
    address: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getProfileDetail = () => {
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "get",
      url: `${url}store/get-profile`,
    })
      .then((response) => {
        // localStorage.setItem("profile_data", response.data.data);
        let profile = response.data.data;
        setProfileDetails({
          ...profileDetails,
          user_name: profile.user_name,
          email: profile?.email,
          contact_number: profile?.contact_number,
          address: profile?.address,
          area: profile?.area,
          city: profile?.city,
          state: profile?.state,
          pincode: profile?.pincode,
        });
      })
      .catch((error) => {
        console.log(error, "kkooll");
      });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file)
      .then((data) => {
        // Handle successful response data
        setprofile_pic(data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
    setProfilePic(URL.createObjectURL(file));
  };

  const handleProfileUpdate = useCallback(async () => {
    setIsLoading(true);
    await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "post",
      url: `${url}store/update-profile`,
      data: {
        ...profileDetails,
        picture: profile_pic,
      },
    })
      .then((response) => {
        toast.success(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  });

  useEffect(() => {
    getProfileDetail();
  }, []);

  return (
    <StoreMain>
      <div className="flex  bg-white rounded-md p-5 justify-center w-[700px] mx-auto">
        <div className="w-[500px] p-4">
          <label
            htmlFor="profile-pic-input"
            className="w-32 h-32 rounded-full bg-black/10 flex items-center justify-center cursor-pointer mx-auto"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Picture"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="/medical.png"
                alt="Profile Picture"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </label>
          <input
            type="file"
            id="profile-pic-input"
            name="profile-pic"
            className="hidden"
            onChange={handleProfilePicChange}
          />

          <div className="grid grid-cols-2 mt-4  gap-4">
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter Username..."
                className="form-control"
                value={profileDetails.user_name}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter Email..."
                className="form-control"
                value={profileDetails.email}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter Contact Number..."
                className="form-control"
                value={profileDetails.contact_number}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter Address..."
                className="form-control"
                value={profileDetails.address}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter Area..."
                className="form-control"
                value={profileDetails.area}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter City..."
                className="form-control"
                value={profileDetails.city}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter State..."
                className="form-control"
                value={profileDetails.state}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
            <div className="relative z-0 w-full mb-4">
              <input
                id="username"
                name="user_name"
                placeholder="Enter Pincode..."
                className="form-control"
                value={profileDetails.pincode}
              />
              {/* {errors.password && (
                  <span className="text-danger text-md font-semibold">
                    {errors.password}
                  </span>
                )} */}
            </div>
          </div>
          <button
            className="bg-success w-[100%] text-white rounded p-2 mt-5"
            onClick={handleProfileUpdate}
          >
            {isLoading ? <Loader /> : "Update"}
          </button>
        </div>
      </div>
    </StoreMain>
  );
};

export default StoreProfile;
