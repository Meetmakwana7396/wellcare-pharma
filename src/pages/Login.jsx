import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-primary justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
            <p className="text-white mt-1">
              The most popular peer to peer lending at SEA
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
        
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white p-10">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-2">Welcome Back</p>
            
              
              <input
                className="form-control pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Email Address"
              /><br/>
              <input
                className=" form-control pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Password"
              />
            <button
              type="submit"
              onClick={()=>navigate("/")}
              className="block w-full bg-primary hover:bg-primary/50 mt-4 py-2.5 rounded-md text-white font-semibold mb-2"
            >
              Login
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
