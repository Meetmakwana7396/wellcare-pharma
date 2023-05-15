import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BiStore,
  BiGridAlt,
  BiUser,
  BiCabinet,
  BiInjection,
  BiCubeAlt,
} from "react-icons/bi";

const StoreSidebar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <>
      <aside
        id="default-sidebar"
        className="sidebar bg-success"
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
                to="/disease"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/disease" ? "bg-white/10" : ""
                }`}
              >
                <BiInjection className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Disease</span>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/products" ? "bg-white/10" : ""
                }`}
              >
                <BiCubeAlt className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default StoreSidebar;
