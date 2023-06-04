import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Main = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("token") && navigate("/");
  }, []);

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="border-3 overflow-y-scroll yo p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Main;
