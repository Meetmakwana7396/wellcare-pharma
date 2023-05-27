import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { URL } from "../../../baseurl";
import MyTable from "../../components/common/MyTable";
import StoreMain from "../../components/common/store/StoreMain";
import {
  formatDate,
  getOrderStatus,
  toIndianCurrency,
} from "../../components/helper/libs";

const StoreOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = () => {
    setIsLoading(true);
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "get",
      url: `${URL}store/list-orders`,
    })
      .then((response) => {
        setOrders(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, "kkooll");
      });
  };

  const columns = [
    {
      name: "id",
      cell: (row) => (
        <span
          className="text-primary cursor-pointer hover:text-black font-semibold w-full"
          onClick={() =>
            navigate("/store-orders/order-details", { state: { data: row } })
          }
        >
          {row?.id}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Medicin Name",
      cell: (row) => row?.medical_shop_order?.medicin?.medicin_name,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row?.user?.user_name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row?.quantity_unit,
    },
    {
      name: "Payment ",
      selector: (row) => toIndianCurrency(row?.total_price.toString()),
    },

    {
      name: "Order Date",
      // selector: (row) => row?.user?.email,
      sortable: "true",
    },
    {
      name: "Status",
      cell: (row) => (
        <span className={`status ${getOrderStatus(row?.order_tracing)}`}>
          {getOrderStatus(row?.order_tracing)}
        </span>
      ),
    },
  ];

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <StoreMain>
      <MyTable
        title="Orders"
        data={orders}
        columns={columns}
        isLoading={isLoading}
      />
    </StoreMain>
  );
};

export default StoreOrders;
