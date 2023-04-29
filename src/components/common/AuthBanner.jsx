import React from "react";

const AuthBanner = (props) => {
    const {title , slogan} = props;
  return (
    <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-primary justify-around items-center hidden">
      <div className="w-[450px]">
        <h1 className="text-white font-bold text-4xl/normal">{title || ""}</h1>
        <p className="text-white mt-1">
          {slogan ? slogan : ""}
        </p>
        <button
          type="submit"
          className="text-xs block w-28 bg-white  mt-4 py-2 rounded mb-2 font-semibold"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default AuthBanner;
