import React from "react";
import Main from "../components/common/Main";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { formatDate } from "../components/helper/libs";

const AdminOrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    setOrderDetails(location?.state?.data);
    setOrderStatus(location?.state?.data?.order_tracing);
  }, [location]);
  return (
    <Main>
      <h1 className="text-2xl font-thin mb-5">Order Details</h1>
      <div className="">
        <div className="grid grid-cols-4 gap-6 p-4">
          <div>
            <h2 className="text-lg font-semibold">Order ID</h2>
            <p className="text-gray-500">{orderDetails?.id}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Name</h2>
            <p className="text-gray-500">
              {orderDetails?.medicin?.medicin_name}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Category</h2>
            <p className="text-gray-500">
              {orderDetails?.medicin?.category?.category_name}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Manufacture Date</h2>
            <p className="text-gray-500">
              {orderDetails?.medicin?.manufacture_date &&
                formatDate(orderDetails?.medicin?.manufacture_date)}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Expire Date</h2>
            <p className="text-gray-500">
              {orderDetails?.medicin?.manufacture_date &&
                formatDate(orderDetails?.medicin?.expire_date)}{" "}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Price</h2>
            <p className="text-gray-500">
              {orderDetails?.medicin?.price && orderDetails?.medicin?.price}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Order Quantity</h2>
            <p className="text-gray-500">
              {orderDetails?.quantity && orderDetails?.quantity}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Disease</h2>
            <p className="text-gray-500">
              {orderDetails?.medicin?.disease?.disease_name &&
                orderDetails?.medicin?.disease?.disease_name}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Pharma Company</h2>
            <p className="text-gray-500">
              {orderDetails?.medicin?.pharma_company?.company_name &&
                orderDetails?.medicin?.pharma_company?.company_name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <span className="text-black/50 ml-3 text-xl">Store Details</span>
        <div className="grid grid-cols-4 gap-6 p-4">
          <div>
            <h2 className="text-lg font-semibold">Store ID</h2>
            <p className="text-gray-500">{orderDetails?.user?.id}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Name</h2>
            <p className="text-gray-500">{orderDetails?.user?.user_name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-gray-500">{orderDetails?.user?.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Store Contact No</h2>
            <p className="text-gray-500">
              {orderDetails?.user?.contact_number}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Store Creation Date</h2>
            <p className="text-gray-500">
              {orderDetails?.user?.createdAt &&
                formatDate(orderDetails?.user?.createdAt)}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-gray-500">{orderDetails?.user?.address}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Area</h2>
            <p className="text-gray-500">{orderDetails?.user?.area}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">City</h2>
            <p className="text-gray-500">{orderDetails?.user?.city}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">State</h2>
            <p className="text-gray-500">{orderDetails?.user?.state}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Pincode</h2>
            <p className="text-gray-500">{orderDetails?.user?.pincode}</p>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AdminOrderDetails;
