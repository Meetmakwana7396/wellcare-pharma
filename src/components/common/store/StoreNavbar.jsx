import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_IMG_URL, URL } from "../../../../baseurl";

const StoreNavbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [profileDetails, setProfileDetails] = useState("");

  const handleMenuVisibility = () => {
    setShowMenu(!showMenu);
  };

  const getProfileDetail = () => {
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "get",
      url: `${URL}store/get-profile`,
    })
      .then((response) => {
        setProfileDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error, "kkooll");
      });
  };

  useEffect(() => {
    if (!profileDetails) {
      getProfileDetail();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      e.target.id !== "avatarButton" ? setShowMenu(false) : "";
    });
  });

  return (
    <div className="navbar px-3 py-1 grid grid-cols-3 gap-4 z-50 sticky top-0">
      <div className="flex justify-start items-center">
        <h1 className="text-lg">Welcome {profileDetails?.user_name}</h1>
      </div>
      <div className="col-span-2 flex justify-end">
        <img
          id="avatarButton"
          type="button"
          onClick={handleMenuVisibility}
          datadropdownplacement="userDropdown"
          className="w-10 h-10 rounded-full cursor-pointer"
          src={ADMIN_IMG_URL + profileDetails?.profile_pic}
          alt="User dropdown"
        />

        {/* <!-- Dropdown menu --> */}
        <div
          id="userDropdown"
          className={`z-10 top-[55px] absolute  shadow-md bg-white divide-y divide-secondary/50 rounded-lg w-44 ${
            showMenu ? "" : "hidden"
          }`}
        >
          <ul className="py-2 text-sm" aria-labelledby="avatarButton">
            <li>
              <Link
                to="/store-profile"
                className="block px-4 py-2 hover:bg-black/10"
              >
                Profile
              </Link>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-black/10">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-black/10">
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-black/10 "
              onClick={() => {
                localStorage.removeItem("store_token");
                navigate("/store-login");
              }}
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreNavbar;
