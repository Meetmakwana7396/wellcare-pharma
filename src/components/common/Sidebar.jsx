import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiStore, BiGridAlt, BiUser, BiCabinet } from "react-icons/bi";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <>
      <aside
        id="default-sidebar"
        className="sidebar bg-primary"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/dashboard" ? "bg-white/10" : ""
                }`}
                id="dashboard"
              >
                <BiGridAlt className="text-[25px]" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/stores" ? "bg-white/10" : ""
                }`}
                to="/stores"
              >
                <BiStore className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Stores</span>
              </Link>
            </li>

            <li>
              <Link
                to="/users"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/users" ? "bg-white/10" : ""
                }`}
              >
                <BiUser className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/category" ? "bg-white/10" : ""
                }`}
              >
                <BiCabinet className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 `}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-white/10"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
