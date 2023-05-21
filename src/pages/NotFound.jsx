import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full text-center">
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-3 text-black">404 Page Not Found</h1>
        <p className="text-lg text-black mb-3">Please check the URL and try again.</p>
        <Link
        to="/store-dashboard"
          className="mt-10 text-white bg-black text-sm font-bold py-2 px-4 rounded-md"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
