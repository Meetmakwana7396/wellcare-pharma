import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import "./index.css";
import Stores from "./pages/Stores";
import ResetPass from "./pages/ResetPass";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword";
import Category from "./pages/Category";
import Disease from "./pages/Disease";
import Products from "./pages/Products";
import StoreLogin from "./pages/store/StoreLogin";
import StoreSignup from "./pages/store/StoreSignup";
import StoreDashboard from "./pages/store/StoreDashboard";
import StoreMedicin from "./pages/store/StoreMedicin";
import StoreMedicinDetails from "./pages/store/StoreMedicinDetails";
import NotFound from "./pages/NotFound";
import StoreOwnMedicin from "./pages/store/StoreOwnMedicin";
import StoreOrders from "./pages/store/StoreOrders";
import OrderDetails from "./pages/store/OrderDetails";
import StoreProfile from "./pages/store/StoreProfile";
import Orders from "./pages/Orders";
import AdminOrderDetails from "./pages/AdminOrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/stores",
    element: <Stores />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/disease",
    element: <Disease />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/orders/admin-order-details",
    element: <AdminOrderDetails />,
  },

  // Store Routes
  {
    path: "/store-login",
    element: <StoreLogin />,
  },
  {
    path: "/store-signup",
    element: <StoreSignup />,
  },
  {
    path: "/store-dashboard",
    element: <StoreDashboard />,
  },
  {
    path: "/store-medicins",
    element: <StoreMedicin />,
  },

  {
    path: "/store-medicins/:medID",
    element: <StoreMedicinDetails />,
  },
  {
    path: "/owned-medicins",
    element: <StoreOwnMedicin />,
  },
  {
    path: "/store-orders",
    element: <StoreOrders />,
  },
  {
    path: "/store-orders/order-details",
    element: <OrderDetails />,
  },
  {
    path: "/store-profile",
    element: <StoreProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  </React.StrictMode>
);
