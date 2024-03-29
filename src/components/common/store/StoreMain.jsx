import React from "react";
import StoreNavbar from "./StoreNavbar";
import StoreSidebar from "./StoreSidebar";

const StoreMain = ({ children }) => {
  return (
    <div className="main-wrapper">
      <StoreSidebar />
      <div className="main-content">
        <StoreNavbar />
        <div className="overflow-y-scroll yo p-5">{children}</div>
      </div>
    </div>
  );
};

export default StoreMain;
