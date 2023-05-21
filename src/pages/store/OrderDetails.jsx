import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StoreMain from "../../components/common/store/StoreMain";

const OrderDetails = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState({});
  useEffect(() => {
    console.log(location?.state?.data, "order Detail");
    setOrderDetails(location?.state?.data);
  }, [location]);

  return (
    <StoreMain>
      {/* <MyTable title="Medicins" data={medicinList} columns={columns} /> */}
      <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
      <div className="p-4">
        <h2 className="text-xl text-secondary mb-5">Customer Details</h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h2 className="text-md font-semibold">Name</h2>
            <p className="text-gray-500">{orderDetails?.user?.user_name}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Email</h2>
            <p className="text-gray-500">{orderDetails?.user?.email}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold">Contact No</h2>
            <p className="text-gray-500">
              {orderDetails?.user?.contact_number}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-4 gap-6 p-4 mt-5">
        <div className="col-span-2">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-gray-500">
            {medicinDetails?.medicin_description &&
              medicinDetails?.medicin_description}
          </p>
        </div>
      </div> */}
    </StoreMain>
  );
};

export default OrderDetails;
