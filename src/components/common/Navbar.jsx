import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuVisibility = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      e.target.id !== "avatarButton" ? setShowMenu(false) : "";
    });
  });

  return (
    <div className="navbar px-3 py-1 grid grid-cols-3 gap-4">
      <div className="flex justify-start items-center">
        <h1 className="text-lg">Wellcare Admin</h1>
      </div>
      <div className="col-span-2 flex justify-end">
        <img
          id="avatarButton"
          type="button"
          onClick={handleMenuVisibility}
          dataDropdownToggle="userDropdown"
          dataDropdownPlacement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXFBOfk-8mYVPpg23ixdQ8WfID6Jy23Kw_aTy-NcZmhA&s"
          alt="User dropdown"
        />

        {/* <!-- Dropdown menu --> */}
        <div
          id="userDropdown"
          className={`z-10 top-[55px] absolute  shadow-md bg-white divide-y divide-gray-100 rounded-lg w-44 ${
            showMenu ? "" : "hidden"
          }`}
        >
          <ul className="py-2 text-sm" aria-labelledby="avatarButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-black/10">
                Dashboard
              </a>
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
                localStorage.removeItem("token");
                navigate("/");
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

export default Navbar;
