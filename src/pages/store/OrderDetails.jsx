import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {  useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../../baseurl";
import StoreMain from "../../components/common/store/StoreMain";
import { statusMap, toIndianCurrency } from "../../components/helper/libs";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [orderStatus, setOrderStatus] = useState("");

  const updateOrderStatus = (e, id) => {
    axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      url: `${URL}store/order-track-update`,
      method: "put",
      data: {
        tracing_status: e.target.value,
        order_id: id,
      },
    })
      .then((response) => {
        toast.success("Order Status Updated");
        setTimeout(() => {
          navigate("/store-orders");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setOrderDetails(location?.state?.data);
    setOrderStatus(location?.state?.data?.order_tracing);
  }, [location]);

  return (
    <StoreMain>
      <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
      <div className="p-4">
        <h2 className="text-xl text-secondary mb-5">Order Details</h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h2 className="text-md font-semibold">Customer Name</h2>
            <p className="text-black">{orderDetails?.user?.user_name}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Email</h2>
            <p className="text-black">{orderDetails?.user?.email}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Contact No</h2>
            <p className="text-black">{orderDetails?.user?.contact_number}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Address</h2>
            <p className="text-black">{orderDetails?.address}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">City</h2>
            <p className="text-black">{orderDetails?.city}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">State</h2>
            <p className="text-black">{orderDetails?.state}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Country</h2>
            <p className="text-black">{orderDetails?.country}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">PinCode</h2>
            <p className="text-black">{orderDetails?.pincode}</p>
          </div>

          <div>
            <h2 className="text-md font-semibold">Payment</h2>
            <p className="text-black">
              {toIndianCurrency((orderDetails?.total_price || "").toString())}
            </p>
          </div>

          <div>
            <h2 className="text-md font-semibold">Quantity</h2>
            <p className="text-black">{orderDetails?.quantity_unit}</p>
          </div>

          <div>
            <h2 className="text-md font-semibold mb-3">Status</h2>
            {/* <p className="text-black">{orderDetails?.quantity_unit}</p> */}
            {orderStatus != "4" ? (
              <select
                name="order_status"
                value={orderStatus}
                onChange={(e) => updateOrderStatus(e, orderDetails?.id)}
                className=" w-[50%] rounded py-2 pl-2 border-secondary border mt-1"
              >
                <option value="">Select Status</option>
                {statusMap.map((status) => (
                  <option key={status.key} value={status.key}>
                    {status.value}
                  </option>
                ))}
              </select>
            ) : (
              <span className="status delivered mt-3">Delivered</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl text-secondary mb-5">Medicin Details</h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h2 className="text-md font-semibold">Name</h2>
            <p className="text-black">
              {orderDetails?.medical_shop_order?.medicin?.medicin_name}
            </p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Price</h2>
            <p className="text-black">{orderDetails?.medicin_price}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Category</h2>
            <p className="text-black">
              {
                orderDetails?.medical_shop_order?.medicin?.category
                  ?.category_name
              }
            </p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Disease</h2>
            <p className="text-black">
              {orderDetails?.medical_shop_order?.medicin?.disease?.disease_name}
            </p>
          </div>
        </div>
      </div>
    </StoreMain>
  );
};

export default OrderDetails;
