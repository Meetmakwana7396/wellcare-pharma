import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Main = ({ children }) => {
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="border-3  p-5">{children}</div>
      </div>
    </div>
  );
};

export default Main;
