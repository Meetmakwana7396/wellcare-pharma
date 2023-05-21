import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BiGridAlt,
  BiInjection,
  BiCubeAlt,
  BiCapsule,
  BiArchive,
  BiCartDownload,
} from "react-icons/bi";
import axios from "axios";
import { URL } from "../../../../baseurl";

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
                to="/store-dashboard"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/store-dashboard" ? "bg-white/10" : ""
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
                  currentPath === "/store-medicins" ? "bg-white/10" : ""
                }`}
                to="/store-medicins"
              >
                <BiCapsule className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Medicins</span>
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/owned-medicins" ? "bg-white/10" : ""
                }`}
                to="/owned-medicins"
              >
                <BiArchive className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  My Medicins
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/store-orders"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-white/10 ${
                  currentPath === "/store-orders" ? "bg-white/10" : ""
                }`}
              >
                <BiCartDownload className="text-[25px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
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
