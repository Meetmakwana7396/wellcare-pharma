import React, { useState } from "react";
import { BiX } from "react-icons/bi";

const OffCanvas = ({ children, isOpen, onClose, title }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={handleClose}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-[400px] bg-white text shadow-lg z-50 transform transition-transform duration-300 ease-out overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: "translateX(0%)" }}
          >
            <BiX
              className="text-[30px] ml-auto cursor-pointer hover:text-danger absolute top-2 bg-black/20 rounded-full right-2"
              onClick={handleClose}
            />
            <div className="px-5">
              <p className="text-2xl font-semibold mt-2">{title || ""}</p>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OffCanvas;
